package repositories

import (
	"context"
	"errors"
	"fmt"

	"database/sql"

	"github.com/bensengupta/youtube-clone/models"
	"github.com/bensengupta/youtube-clone/utils"
	"github.com/segmentio/ksuid"
)

type UserRepository struct {
	db *sql.DB
}

func NewUserRepository(db *sql.DB) (s *UserRepository) {
	return &UserRepository{db: db}
}

var ErrUniqueViolation = errors.New("unique violation")

func (s *UserRepository) CreateUser(ctx context.Context, email string, password string) (ksuid.KSUID, error) {
	userId := ksuid.New()

	_, err := s.db.Exec("INSERT INTO users (id, email, password) VALUES ($1, $2, $3)", userId, email, password)

	if err != nil {
		if utils.IsPostgresError(err, "unique_violation") {
			return ksuid.Nil, fmt.Errorf("create user: %v: %w", email, ErrUniqueViolation)
		}
		return ksuid.Nil, fmt.Errorf("create user: %v: %v", email, err)
	}

	return userId, nil
}

var ErrNotFound error = errors.New("not found")

func (s *UserRepository) GetUserById(ctx context.Context, id ksuid.KSUID) (models.User, error) {
	var user models.User

	row := s.db.QueryRow("SELECT id, email, password, created_at FROM users WHERE id = $1", id.String())
	err := row.Scan(&user.Id, &user.Email, &user.PasswordHash, &user.CreatedAt)

	if err != nil {
		if err == sql.ErrNoRows {
			return user, fmt.Errorf("get user: %d: %w", id, ErrNotFound)
		}
		return user, fmt.Errorf("get user: %d: %v", id, err)
	}

	return user, nil
}

func (s *UserRepository) GetUserByEmail(ctx context.Context, email string) (models.User, error) {
	var user models.User

	row := s.db.QueryRow("SELECT id, email, password, created_at FROM users WHERE email = $1", email)
	err := row.Scan(&user.Id, &user.Email, &user.PasswordHash)

	if err != nil {
		if err == sql.ErrNoRows {
			return user, fmt.Errorf("get user: %s: %w", email, ErrNotFound)
		}
		return user, fmt.Errorf("get user: %s: %v", email, err)
	}

	return user, nil
}
