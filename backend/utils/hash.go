package utils

import (
	"crypto/rand"
	"crypto/subtle"
	"encoding/base64"
	"errors"
	"fmt"
	"strings"

	"golang.org/x/crypto/argon2"
)

// Inspired by "How to Hash and Verify Passwords With Argon2 in Go" blog post by Alex Edwards
// https://www.alexedwards.net/blog/how-to-hash-and-verify-passwords-with-argon2-in-go

var (
	ErrInvalidHash         = errors.New("the encoded hash is not in the correct format")
	ErrIncompatibleVersion = errors.New("incompatible version of argon2")
)

type HashOptions struct {
	memory      uint32
	iterations  uint32
	parallelism uint8
	saltLength  uint32
	keyLength   uint32
}

var DefaultHashOptions = &HashOptions{
	memory:      64 * 1024,
	iterations:  3,
	parallelism: 2,
	saltLength:  16,
	keyLength:   32,
}

func generateRandomBytes(n uint32) ([]byte, error) {
	b := make([]byte, n)
	_, err := rand.Read(b)
	if err != nil {
		return nil, err
	}

	return b, nil
}

func HashPassword(password string, options *HashOptions) (encodedHash string, err error) {
	if options == nil {
		options = DefaultHashOptions
	}

	// Generate a cryptographically secure random salt.
	salt, err := generateRandomBytes(options.saltLength)
	if err != nil {
		return "", fmt.Errorf("hash password: failed to generate salt: %v", err)
	}

	hash := argon2.IDKey([]byte(password), salt, options.iterations, options.memory, options.parallelism, options.keyLength)

	// Base64 encode the salt and hashed password.
	b64Salt := base64.RawStdEncoding.EncodeToString(salt)
	b64Hash := base64.RawStdEncoding.EncodeToString(hash)

	// Return a string using the standard encoded hash representation.
	encodedHash = fmt.Sprintf("$argon2id$v=%d$m=%d,t=%d,p=%d$%s$%s", argon2.Version, options.memory, options.iterations, options.parallelism, b64Salt, b64Hash)
	return encodedHash, nil
}

func decodeHash(encodedHash string) (options *HashOptions, salt, hash []byte, err error) {
	vals := strings.Split(encodedHash, "$")
	if len(vals) != 6 {
		return nil, nil, nil, ErrInvalidHash
	}

	var version int
	_, err = fmt.Sscanf(vals[2], "v=%d", &version)
	if err != nil {
		return nil, nil, nil, err
	}
	if version != argon2.Version {
		return nil, nil, nil, ErrIncompatibleVersion
	}

	options = &HashOptions{}
	_, err = fmt.Sscanf(vals[3], "m=%d,t=%d,p=%d", &options.memory, &options.iterations, &options.parallelism)
	if err != nil {
		return nil, nil, nil, err
	}

	salt, err = base64.RawStdEncoding.Strict().DecodeString(vals[4])
	if err != nil {
		return nil, nil, nil, err
	}
	options.saltLength = uint32(len(salt))

	hash, err = base64.RawStdEncoding.Strict().DecodeString(vals[5])
	if err != nil {
		return nil, nil, nil, err
	}
	options.keyLength = uint32(len(hash))

	return options, salt, hash, nil
}

func CheckPasswordHash(password string, encodedHash string) (equal bool, err error) {
	p, salt, hash, err := decodeHash(encodedHash)
	if err != nil {
		return false, fmt.Errorf("check password hash: %v", err)
	}

	// Derive the key from the other password using the same parameters.
	otherHash := argon2.IDKey([]byte(password), salt, p.iterations, p.memory, p.parallelism, p.keyLength)

	// Check that the contents of the hashed passwords are identical. Note
	// that we are using the subtle.ConstantTimeCompare() function for this
	// to help prevent timing attacks.
	if subtle.ConstantTimeCompare(hash, otherHash) == 1 {
		return true, nil
	}

	return false, nil
}
