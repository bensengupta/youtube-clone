package utils

import "github.com/lib/pq"

func IsPostgresError(err error, name string) bool {
	if err == nil {
		return false
	}

	pgErr, ok := err.(*pq.Error)
	if !ok {
		return false
	}

	return pgErr.Code.Name() == name
}
