package video

import (
	"context"
	"encoding/json"
	"log/slog"
	"net/http"

	"github.com/bensengupta/youtube-clone/components"
	"github.com/bensengupta/youtube-clone/models"
	"github.com/bensengupta/youtube-clone/utils"
	"github.com/segmentio/ksuid"
)

type VideoService interface {
	StartVideoUpload(ctx context.Context, input models.StartVideoUploadInput) (videoId ksuid.KSUID, presignedUrl string, err error)
	HandleS3UploadEvent(ctx context.Context, objectKey string) error
}

type AuthService interface {
	GetUserIdBySessionId(ctx context.Context, sessionId ksuid.KSUID) (ksuid.KSUID, error)
}

func NewVideoUploadHandler(log *slog.Logger, vs VideoService, as AuthService) *VideoUploadHandler {
	return &VideoUploadHandler{Log: log, VideoService: vs, AuthService: as}
}

type VideoUploadHandler struct {
	Log          *slog.Logger
	VideoService VideoService
	AuthService  AuthService
}

func (h *VideoUploadHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPut {
		h.Put(w, r)
		return
	}

	h.Get(w, r)
}

func (h *VideoUploadHandler) Get(w http.ResponseWriter, r *http.Request) {
	if utils.GetSessionId(r) == ksuid.Nil {
		utils.RedirectToLogin(w, r)
		return
	}

	h.View(w, r)
}

type UploadVideoPutRequest struct {
	ContentType string `json:"contentType"`
	FileSize    int64  `json:"fileSize"`
}

type UploadVideoPutResponse struct {
	PresignedUrl string `json:"presignedUrl"`
	CallbackPath string `json:"callbackPath"`
}

func (h *VideoUploadHandler) Put(w http.ResponseWriter, r *http.Request) {
	sessionId := utils.GetSessionId(r)
	if sessionId == ksuid.Nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	userId, err := h.AuthService.GetUserIdBySessionId(r.Context(), sessionId)
	if err != nil {
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}

	putRequest := UploadVideoPutRequest{}
	err = json.NewDecoder(r.Body).Decode(&putRequest)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	videoId, presignedUrl, err := h.VideoService.StartVideoUpload(
		r.Context(),
		models.StartVideoUploadInput{
			UserId:      userId,
			ContentType: putRequest.ContentType,
			FileSize:    putRequest.FileSize,
		},
	)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	callbackPath := "/v/upload/" + videoId.String()

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(UploadVideoPutResponse{
		PresignedUrl: presignedUrl,
		CallbackPath: callbackPath,
	})
}

func (h *VideoUploadHandler) View(w http.ResponseWriter, r *http.Request) {
	components.VideoUploadPage().Render(r.Context(), w)
}
