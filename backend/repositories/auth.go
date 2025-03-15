package repositories

import (
	"context"
	"encoding/json"
	"fmt"

	"github.com/segmentio/ksuid"
	"github.com/valkey-io/valkey-go"
)

type AuthRepository struct {
	client valkey.Client
}

func NewAuthRepository(client valkey.Client) (s *AuthRepository) {
	return &AuthRepository{client: client}
}

const (
	PrefixSession     string = "session:"
	PrefixForgotEmail        = "forgot-email:"
)

type Session struct {
	UserId string `json:"user_id"`
}

func (s *AuthRepository) CreateSession(ctx context.Context, userId ksuid.KSUID) (ksuid.KSUID, error) {
	sessId := ksuid.New()
	key := PrefixSession + sessId.String()
	session := Session{
		UserId: userId.String(),
	}
	jsonSession, err := json.Marshal(session)
	if err != nil {
		return ksuid.Nil, fmt.Errorf("create session: %v", err)
	}
	err = s.client.Do(ctx, s.client.B().Set().Key(key).Value(string(jsonSession)).Build()).Error()
	if err != nil {
		return ksuid.Nil, fmt.Errorf("create session: %v", err)
	}
	return sessId, nil
}

func (s *AuthRepository) GetSession(ctx context.Context, sessionId ksuid.KSUID) (Session, error) {
	key := PrefixSession + sessionId.String()
	bytes, err := s.client.Do(ctx, s.client.B().Get().Key(key).Build()).AsBytes()
	if err != nil {
		return Session{}, fmt.Errorf("get session: %w", err)
	}

	session := Session{}
	err = json.Unmarshal(bytes, &session)
	if err != nil {
		return Session{}, fmt.Errorf("get session: %v", err)
	}

	return session, nil
}

func (s *AuthRepository) DeleteSession(ctx context.Context, sessionId ksuid.KSUID) error {
	key := PrefixSession + sessionId.String()
	err := s.client.Do(ctx, s.client.B().Del().Key(key).Build()).Error()
	if err != nil {
		return fmt.Errorf("delete session: %v", err)
	}
	return nil
}
