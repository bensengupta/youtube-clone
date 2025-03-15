package main

import (
	"context"
	"log/slog"
	"os"

	"github.com/bensengupta/youtube-clone/clients"
	videoHandlers "github.com/bensengupta/youtube-clone/handlers/video"
	"github.com/bensengupta/youtube-clone/repositories"
	"github.com/bensengupta/youtube-clone/services"
	"github.com/bensengupta/youtube-clone/utils"
)

func main() {
	log := slog.New(slog.NewTextHandler(os.Stderr, nil))

	db, err := clients.NewDB()
	if err != nil {
		log.Error("failed to create db", slog.Any("error", err))
		os.Exit(1)
	}

	backgroundContext := context.Background()
	s3client, err := clients.NewS3Client(backgroundContext)
	if err != nil {
		log.Error("failed to create s3 client", slog.Any("error", err))
		os.Exit(1)
	}
	sqsclient, err := clients.NewSQSClient(backgroundContext)
	if err != nil {
		log.Error("failed to create sqs client", slog.Any("error", err))
		os.Exit(1)
	}

	validate := utils.NewValidate()

	// Repositories
	videoRepository := repositories.NewVideoRepository(db)

	// Services
	videoService := services.NewVideoService(log, validate, videoRepository, s3client)

	// Handlers
	s3videoUploadConsumerHandler := videoHandlers.NewS3VideoUploadConsumerHandler(log, sqsclient, videoService)

	s3videoUploadConsumerHandler.StartProcessingEvents(backgroundContext)
}
