package handlers

import (
	"fmt"
	"log/slog"
	"net/http"
	"strings"

	"github.com/bensengupta/youtube-clone/components"
	"github.com/bensengupta/youtube-clone/models"
	"github.com/bensengupta/youtube-clone/utils"
	"github.com/segmentio/ksuid"
)

func NewLoginHandler(log *slog.Logger, as AuthService) *LoginHandler {
	return &LoginHandler{Log: log, AuthService: as}
}

type LoginHandler struct {
	Log         *slog.Logger
	AuthService AuthService
}

func (h *LoginHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		h.Post(w, r)
		return
	}
	h.Get(w, r)
}

func (h *LoginHandler) Get(w http.ResponseWriter, r *http.Request) {
	if utils.GetSessionId(r) != ksuid.Nil {
		http.Redirect(w, r, "/", http.StatusSeeOther)
		return
	}
	h.View(w, r, components.LoginPageProps{})
}

func (h *LoginHandler) Post(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()

	email := r.Form.Get("Email")
	password := r.Form.Get("Password")

	sessionId, err := h.AuthService.Login(r.Context(), models.LoginInput{
		Email:    email,
		Password: password,
	})

	if err != nil {
		props := components.LoginPageProps{
			EmailValue:    email,
			PasswordValue: password,
			Error:         fmt.Sprintf("Error: %v", err),
		}
		h.View(w, r, props)
		return
	}

	next := r.URL.Query().Get("next")
	if next == "" || next == "/login" || next == "/logout" || !strings.HasPrefix(next, "/") {
		next = "/"
	}

	utils.SetSessionId(w, sessionId)
	http.Redirect(w, r, next, http.StatusSeeOther)
}

func (h *LoginHandler) View(w http.ResponseWriter, r *http.Request, p components.LoginPageProps) {
	components.LoginPage(p).Render(r.Context(), w)
}
