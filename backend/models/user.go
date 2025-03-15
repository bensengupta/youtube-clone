package models

import (
	"time"

	"github.com/bensengupta/youtube-clone/utils"
	"github.com/segmentio/ksuid"
)

type User struct {
	Id           ksuid.KSUID
	Email        string
	PasswordHash string
	CreatedAt    time.Time
}

type LoginInput struct {
	Email    string
	Password string
}

type RegisterInput struct {
	Email    string `validate:"required,max=128"`
	Password string `validate:"required,min=8,max=64"`
}

type RegisterResponse struct {
	SessionId   ksuid.KSUID
	FieldErrors utils.ValidationErrors
}
