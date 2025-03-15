package main

import (
	"context"
	"fmt"
	"log/slog"
	"net/http"
	"os"

	"github.com/bensengupta/youtube-clone/clients"
	"github.com/bensengupta/youtube-clone/handlers"
	videoHandlers "github.com/bensengupta/youtube-clone/handlers/video"
	"github.com/bensengupta/youtube-clone/repositories"
	"github.com/bensengupta/youtube-clone/services"
	"github.com/bensengupta/youtube-clone/utils"
)

func main() {
	log := slog.New(slog.NewTextHandler(os.Stderr, nil))

	valkeyClient, err := clients.NewValkeyClient()
	if err != nil {
		log.Error("failed to create valkey client", slog.Any("error", err))
		os.Exit(1)
	}

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

	validate := utils.NewValidate()

	// Repositories
	authRepository := repositories.NewAuthRepository(valkeyClient)
	userRepository := repositories.NewUserRepository(db)
	videoRepository := repositories.NewVideoRepository(db)

	// Services
	authService := services.NewAuthService(log, validate, authRepository, userRepository)
	videoService := services.NewVideoService(log, validate, videoRepository, s3client)

	// Routes and Handlers
	router := http.NewServeMux()
	router.Handle("/assets/", http.StripPrefix("/assets/", http.FileServer(http.Dir("assets"))))
	router.Handle("/", handlers.NewHomeHandler(log, authService))
	router.Handle("/v/upload", videoHandlers.NewVideoUploadHandler(log, videoService, authService))
	router.Handle("/register", handlers.NewRegisterHandler(log, authService))
	router.Handle("/login", handlers.NewLoginHandler(log, authService))
	router.Handle("/logout", handlers.NewLogoutHandler(log))

	fmt.Printf("Listening on port 8080\n")
	http.ListenAndServe(":8080", router)
}
