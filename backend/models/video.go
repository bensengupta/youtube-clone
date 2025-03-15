package models

import (
	"time"

	"github.com/bensengupta/youtube-clone/utils"
	"github.com/segmentio/ksuid"
)

const (
	VideoVisibilityPublic   string = "public"
	VideoVisibilityUnlisted string = "unlisted"
)

type Video struct {
	Id               ksuid.KSUID
	UploaderId       ksuid.KSUID
	Title            string
	Visibility       string
	Description      string
	IsUploadComplete bool
	CreatedAt        time.Time
}

type StartVideoUploadInput struct {
	UserId      ksuid.KSUID
	ContentType string
	FileSize    int64
}

type UpdateVideoUploadInput struct {
	Title       string `validate:"required,max=128"`
	Visibility  string `validate:"required,oneof=public unlisted"`
	Description string `validate:"max=3000"`
}

type UpdateVideoUploadResponse struct {
	FieldErrors utils.ValidationErrors
}
