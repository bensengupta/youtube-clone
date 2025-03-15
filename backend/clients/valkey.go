package clients

import (
	"github.com/valkey-io/valkey-go"
	"os"
)

func NewValkeyClient() (valkey.Client, error) {
	valkeyUrl := os.Getenv("VALKEY_ADDRESS")
	return valkey.NewClient(valkey.ClientOption{
		InitAddress: []string{valkeyUrl},
	})
}
