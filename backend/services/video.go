package services

import (
	"context"
	"fmt"
	"log/slog"

	"github.com/bensengupta/youtube-clone/clients"
	"github.com/bensengupta/youtube-clone/models"
	"github.com/bensengupta/youtube-clone/repositories"
	"github.com/bensengupta/youtube-clone/utils"
	"github.com/segmentio/ksuid"
)

func NewVideoService(
	log *slog.Logger,
	validate *utils.Validate,
	vr *repositories.VideoRepository,
	s3client clients.S3Client,
) VideoService {
	return VideoService{
		Log:             log,
		Validate:        validate,
		VideoRepository: vr,
		S3Client:        s3client,
	}
}

type VideoService struct {
	Log             *slog.Logger
	Validate        *utils.Validate
	VideoRepository *repositories.VideoRepository
	S3Client        clients.S3Client
}

var (
	ErrVideoUploadFileSizeLimitExceeded = fmt.Errorf("video upload file size limit exceeded")
	ErrUnsuportedContentType            = fmt.Errorf("unsupported content type, only mp4 is supported")
)

const VIDEO_UPLOAD_PRESIGNED_URL_LIFETIME_SECS int64 = 5 * 60
const VIDEO_FILE_SIZE_LIMIT int64 = 5 * 1000 * 1000 * 1000 // 5 GB

func (self VideoService) StartVideoUpload(ctx context.Context, input models.StartVideoUploadInput) (videoId ksuid.KSUID, presignedUrl string, err error) {
	if input.FileSize > int64(VIDEO_FILE_SIZE_LIMIT) {
		return ksuid.Nil, "", ErrVideoUploadFileSizeLimitExceeded
	}

	if input.ContentType != "video/mp4" {
		return ksuid.Nil, "", ErrUnsuportedContentType
	}

	videoId, err = self.VideoRepository.CreateVideo(
		ctx,
		input.UserId,
		"Untitled",
		models.VideoVisibilityUnlisted,
		"",
		false,
	)
	if err != nil {
		self.Log.Error("Error creating video upload", slog.Any("error", err))
		return ksuid.Nil, "", ErrInternal
	}

	objectKey := formatOriginalVideoUploadKey(videoId)
	url, err := self.S3Client.PutObjectPresignedURL(ctx, clients.PutObjectPresignedURLInput{
		ObjectKey:     objectKey,
		LifetimeSecs:  VIDEO_UPLOAD_PRESIGNED_URL_LIFETIME_SECS,
		ContentType:   input.ContentType,
		ContentLength: input.FileSize,
	})
	if err != nil {
		self.Log.Error("Error creating presigned URL", slog.Any("error", err))
		return ksuid.Nil, "", ErrInternal
	}

	return videoId, url, nil
}

func (self VideoService) HandleS3UploadEvent(ctx context.Context, objectKey string) error {
	videoId, err := parseVideoUploadIdFromKey(objectKey)
	if err != nil {
		self.Log.Error("Error parsing video upload id from key", slog.Any("error", err))
		return fmt.Errorf("handle s3 upload event: %v", err)
	}

	err = self.VideoRepository.UpdateIsUploadComplete(ctx, videoId, true)
	if err != nil {
		self.Log.Error("Error updating video upload", slog.Any("error", err))
		return fmt.Errorf("handle s3 upload event: %v", err)
	}

	return nil
}

func (self VideoService) UpdateVideoUpload(
	ctx context.Context,
	input models.UpdateVideoUploadInput,
) (models.UpdateVideoUploadResponse, error) {
	return models.UpdateVideoUploadResponse{}, nil
}

func formatOriginalVideoUploadKey(videoId ksuid.KSUID) string {
	return "videos/" + videoId.String() + "/original"
}

func parseVideoUploadIdFromKey(key string) (ksuid.KSUID, error) {
	if len(key) < 7+27 {
		return ksuid.Nil, fmt.Errorf("parse video upload id: invalid key: %s", key)
	}
	id, err := ksuid.Parse(key[7 : 7+27])
	if err != nil {
		return ksuid.Nil, fmt.Errorf("parse video upload id: %v", err)
	}
	return id, nil
}
