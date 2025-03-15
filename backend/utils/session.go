package utils

import (
	"net/http"

	"github.com/segmentio/ksuid"
)

const SECURE = false

// func NewAuthRequiredMiddleware(next http.Handler) http.Handler {
// 	return AuthRequiredMiddleware{
// 		Next: next,
// 	}
// }
//
// type AuthRequiredMiddleware struct {
// 	Next http.Handler
// }
//
// func (mw AuthRequiredMiddleware) ServeHTTP(w http.ResponseWriter, r *http.Request) {
// 	id := ReadSessionID(r)
// 	if id == "" {
// 		RedirectToLogin(w, r)
// 	}
// 	mw.Next.ServeHTTP(w, r)
// }

func GetSessionId(r *http.Request) (id ksuid.KSUID) {
	cookie, err := r.Cookie("sessionId")
	if err != nil {
		return ksuid.Nil
	}
	id, err = ksuid.Parse(cookie.Value)
	if err != nil {
		return ksuid.Nil
	}
	return id
}

func ClearSessionId(w http.ResponseWriter) {
	http.SetCookie(w, &http.Cookie{Name: "sessionId", Value: "", Secure: SECURE, HttpOnly: true, MaxAge: -1})
}

func SetSessionId(w http.ResponseWriter, sessionId ksuid.KSUID) {
	http.SetCookie(w, &http.Cookie{Name: "sessionId", Value: sessionId.String(), Secure: SECURE, HttpOnly: true})
}
