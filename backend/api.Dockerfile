FROM golang:1.24-alpine
WORKDIR /app

RUN go install github.com/air-verse/air@latest

COPY go.mod go.sum ./
RUN go mod download
COPY . /app

CMD air --build.cmd 'go build -o tmp/api cmd/api/main.go' --build.bin './tmp/api'

# # Use official Golang image to build the app
# FROM golang:1.24-alpine as builder
#
# WORKDIR /app
#
# RUN go install github.com/a-h/templ/cmd/templ@latest
#
# COPY go.mod go.sum ./
# RUN go mod download
# COPY . /app
# RUN templ generate
#
# # Build the Go app
# RUN go build -o main
#
# # Create a minimal image for deployment
# FROM alpine:latest
# WORKDIR /root/
# COPY --from=builder /app/main .
# EXPOSE 8080
#
# CMD ["./main"]
