package handlers

import (
	"context"
	"fmt"
	"log/slog"
	"net/http"

	"github.com/bensengupta/youtube-clone/components"
	"github.com/bensengupta/youtube-clone/models"
	"github.com/bensengupta/youtube-clone/utils"
	"github.com/segmentio/ksuid"
)

type AuthService interface {
	Login(ctx context.Context, values models.LoginInput) (ksuid.KSUID, error)
	Register(ctx context.Context, values models.RegisterInput) (models.RegisterResponse, error)
	GetUserBySessionId(ctx context.Context, sessionId ksuid.KSUID) (models.User, error)
}

func NewRegisterHandler(log *slog.Logger, as AuthService) *RegisterHandler {
	return &RegisterHandler{Log: log, AuthService: as}
}

type RegisterHandler struct {
	Log         *slog.Logger
	AuthService AuthService
}

func (h *RegisterHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		h.Post(w, r)
		return
	}
	h.Get(w, r)
}

func (h *RegisterHandler) Get(w http.ResponseWriter, r *http.Request) {
	if utils.GetSessionId(r) != ksuid.Nil {
		http.Redirect(w, r, "/", http.StatusSeeOther)
		return
	}
	h.View(w, r, components.RegisterPageProps{})
}

func (h *RegisterHandler) Post(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()

	email := r.Form.Get("Email")
	password := r.Form.Get("Password")

	response, err := h.AuthService.Register(r.Context(), models.RegisterInput{
		Email:    email,
		Password: password,
	})

	var error string
	if err != nil {
		error = fmt.Sprintf("Error: %v", err)
	}

	if response.SessionId == ksuid.Nil {
		props := components.RegisterPageProps{
			EmailValue:    email,
			PasswordValue: password,
			Error:         error,
			FieldErrors:   response.FieldErrors,
		}
		h.View(w, r, props)
		return
	}
	utils.SetSessionId(w, response.SessionId)
	http.Redirect(w, r, "/", http.StatusSeeOther)

}

func (h *RegisterHandler) View(w http.ResponseWriter, r *http.Request, p components.RegisterPageProps) {
	components.RegisterPage(p).Render(r.Context(), w)
}
