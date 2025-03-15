package repositories

import (
	"context"
	"fmt"

	"database/sql"

	"github.com/bensengupta/youtube-clone/models"
	"github.com/segmentio/ksuid"
)

type VideoRepository struct {
	db *sql.DB
}

func NewVideoRepository(db *sql.DB) (s *VideoRepository) {
	return &VideoRepository{db: db}
}

func (s *VideoRepository) CreateVideo(
	ctx context.Context,
	uploaderId ksuid.KSUID,
	title string,
	visibility string,
	description string,
	isUploadComplete bool,
) (ksuid.KSUID, error) {
	videoId := ksuid.New()
	_, err := s.db.Exec(
		"INSERT INTO videos (id, uploader_id, title, visibility, description, is_upload_complete) VALUES ($1, $2, $3, $4, $5, $6)",
		videoId.String(),
		uploaderId.String(),
		title,
		visibility,
		description,
		isUploadComplete,
	)

	if err != nil {
		return ksuid.Nil, fmt.Errorf("create video: %v", err)
	}

	return videoId, nil
}

func (s *VideoRepository) GetVideoById(ctx context.Context, id ksuid.KSUID) (models.Video, error) {
	var video models.Video

	row := s.db.QueryRow(
		"SELECT id, uploader_id, title, visibility, description, is_upload_complete, created_at FROM videos WHERE id = $1",
		id.String(),
	)
	err := row.Scan(
		&video.Id,
		&video.UploaderId,
		&video.Title,
		&video.Visibility,
		&video.Description,
		&video.IsUploadComplete,
		&video.CreatedAt,
	)

	if err != nil {
		if err == sql.ErrNoRows {
			return models.Video{}, fmt.Errorf("get video by id %d: %w", id, ErrNotFound)
		}
		return models.Video{}, fmt.Errorf("get video by id %d: %v", id, err)
	}

	return video, nil
}

func (s *VideoRepository) UpdateIsUploadComplete(ctx context.Context, id ksuid.KSUID, isUploadComplete bool) error {
	result, err := s.db.Exec(
		"UPDATE videos SET is_upload_complete = $1 WHERE id = $2",
		isUploadComplete,
		id.String(),
	)

	if err != nil {
		return fmt.Errorf("update is upload complete: %v", err)
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return fmt.Errorf("update is upload complete: %v", err)
	}

	if rowsAffected == 0 {
		return fmt.Errorf("update is upload complete: %w", ErrNotFound)
	}

	return nil
}
