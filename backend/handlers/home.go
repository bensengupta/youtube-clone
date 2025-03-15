package handlers

import (
	"log/slog"
	"net/http"

	"github.com/bensengupta/youtube-clone/components"
	"github.com/bensengupta/youtube-clone/utils"
	"github.com/segmentio/ksuid"
)

func NewHomeHandler(log *slog.Logger, as AuthService) *HomeHandler {
	return &HomeHandler{Log: log, AuthService: as}
}

type HomeHandler struct {
	Log         *slog.Logger
	AuthService AuthService
}

func (self *HomeHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		self.Post(w, r)
		return
	}
	self.Get(w, r)
}

func (self *HomeHandler) Get(w http.ResponseWriter, r *http.Request) {
	sessionId := utils.GetSessionId(r)
	if sessionId == ksuid.Nil {
		utils.RedirectToLogin(w, r)
		return
	}

	user, err := self.AuthService.GetUserBySessionId(r.Context(), sessionId)
	if err != nil {
		utils.ClearSessionId(w)
		utils.RedirectToLogin(w, r)
	}

	self.View(w, r, components.HomePageProps{Email: user.Email})
}

func (h *HomeHandler) Post(w http.ResponseWriter, r *http.Request) {
}

func (h *HomeHandler) View(w http.ResponseWriter, r *http.Request, p components.HomePageProps) {
	components.HomePage(p).Render(r.Context(), w)
}
