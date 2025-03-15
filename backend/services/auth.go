package services

import (
	"context"
	"errors"
	"log/slog"

	"github.com/bensengupta/youtube-clone/models"
	"github.com/bensengupta/youtube-clone/repositories"
	"github.com/bensengupta/youtube-clone/utils"
	"github.com/segmentio/ksuid"
)

func NewAuthService(log *slog.Logger, validate *utils.Validate, ar *repositories.AuthRepository, ur *repositories.UserRepository) AuthService {
	return AuthService{
		Log:            log,
		AuthRepository: ar,
		UserRepository: ur,
		Validate:       validate,
	}
}

type AuthService struct {
	Log            *slog.Logger
	AuthRepository *repositories.AuthRepository
	UserRepository *repositories.UserRepository
	Validate       *utils.Validate
}

var ErrInternal = errors.New("internal server error")
var ErrEmailTaken = errors.New("a user with that email already exists")
var ErrIncorrectCredentials = errors.New("username or password is incorrect")

func (self AuthService) Register(ctx context.Context, input models.RegisterInput) (models.RegisterResponse, error) {
	response := models.RegisterResponse{}
	fieldErrors := self.Validate.Struct(input)

	if len(fieldErrors) > 0 {
		response.FieldErrors = fieldErrors
		return response, nil
	}

	hashedPassword, err := utils.HashPassword(input.Password, nil)
	if err != nil {
		self.Log.Error("Failed to hash password", slog.Any("error", err))
		return response, ErrInternal
	}

	userId, err := self.UserRepository.CreateUser(ctx, input.Email, hashedPassword)
	if err != nil {
		if errors.Is(err, repositories.ErrUniqueViolation) {
			return response, ErrEmailTaken
		}
		self.Log.Error("Failed to create user", slog.Any("error", err))
		return response, ErrInternal
	}

	sessionId, err := self.AuthRepository.CreateSession(ctx, userId)
	if err != nil {
		self.Log.Error("Failed to create session", slog.Any("error", err))
		return response, ErrInternal
	}

	response.SessionId = sessionId
	return response, nil
}

func (self AuthService) Login(ctx context.Context, input models.LoginInput) (ksuid.KSUID, error) {
	user, err := self.UserRepository.GetUserByEmail(ctx, input.Email)

	if err != nil {
		return ksuid.Nil, ErrIncorrectCredentials
	}

	equal, err := utils.CheckPasswordHash(input.Password, user.PasswordHash)

	if err != nil {
		self.Log.Error("Failed to check password hash", slog.Any("error", err))
		return ksuid.Nil, ErrInternal
	}

	if !equal {
		return ksuid.Nil, ErrIncorrectCredentials
	}

	sessionId, err := self.AuthRepository.CreateSession(ctx, user.Id)
	if err != nil {
		self.Log.Error("Failed to create session", slog.Any("error", err))
		return ksuid.Nil, ErrInternal
	}

	return sessionId, nil
}

func (self AuthService) GetUserIdBySessionId(ctx context.Context, sessionId ksuid.KSUID) (userId ksuid.KSUID, err error) {
	session, err := self.AuthRepository.GetSession(ctx, sessionId)

	if err != nil {
		return ksuid.Nil, errors.New("session not found")
	}

	userId, err = ksuid.Parse(session.UserId)
	if err != nil {
		self.Log.Error("Failed to parse user id", slog.Any("error", err), slog.String("userId", session.UserId))
		return ksuid.Nil, ErrInternal
	}

	return userId, nil
}

func (self AuthService) GetUserBySessionId(ctx context.Context, sessionId ksuid.KSUID) (user models.User, err error) {
	userId, err := self.GetUserIdBySessionId(ctx, sessionId)
	if err != nil {
		return models.User{}, err
	}

	user, err = self.UserRepository.GetUserById(ctx, userId)
	if err != nil {
		self.Log.Error(
			"Failed to find user with session",
			slog.Any("error", err),
			slog.String("userId", userId.String()),
			slog.String("sessionId", sessionId.String()),
		)
		return models.User{}, errors.New("user not found")
	}

	return user, nil
}
