package utils

import "net/http"

func RedirectToLogin(w http.ResponseWriter, r *http.Request) {
	http.Redirect(w, r, "/login?next="+r.URL.Path, http.StatusFound)
}
