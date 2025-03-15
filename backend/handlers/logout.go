package handlers

import (
	"log/slog"
	"net/http"

	"github.com/bensengupta/youtube-clone/utils"
)

func NewLogoutHandler(log *slog.Logger) *LogoutHandler {
	return &LogoutHandler{Log: log}
}

type LogoutHandler struct {
	Log *slog.Logger
}

func (h *LogoutHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	h.Get(w, r)
}

func (h *LogoutHandler) Get(w http.ResponseWriter, r *http.Request) {
	utils.ClearSessionId(w)
	http.Redirect(w, r, "/login", http.StatusFound)
}
