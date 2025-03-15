package clients

import (
	"context"
	"fmt"
	"os"
	"strings"
	"time"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)

type S3Client struct {
	presignClient         *s3.PresignClient
	bucketName            string
	s3InternalEndpointUrl string
	s3PublicEndpointUrl   string
}

func NewS3Client(ctx context.Context) (S3Client, error) {
	cfg, err := config.LoadDefaultConfig(ctx)

	if err != nil {
		return S3Client{}, fmt.Errorf("create s3 client: %v", err)
	}

	// If this env var is set, we are running in a localstack environment
	s3InternalEndpointUrl := os.Getenv("AWS_ENDPOINT_URL")
	s3PublicEndpointUrl := os.Getenv("AWS_S3_PUBLIC_URL")
	s3BucketName := os.Getenv("AWS_S3_BUCKET_NAME")

	// Create an Amazon S3 service presigner
	client := s3.NewFromConfig(cfg, func(o *s3.Options) {
		if s3InternalEndpointUrl != "" {
			o.UsePathStyle = true
			o.BaseEndpoint = aws.String(s3InternalEndpointUrl)
		}
	})
	presigner := s3.NewPresignClient(client)

	return S3Client{
		presignClient:         presigner,
		bucketName:            s3BucketName,
		s3InternalEndpointUrl: s3InternalEndpointUrl,
		s3PublicEndpointUrl:   s3PublicEndpointUrl,
	}, nil
}

type PutObjectPresignedURLInput struct {
	ObjectKey     string
	LifetimeSecs  int64
	ContentType   string
	ContentLength int64
}

func (self S3Client) PutObjectPresignedURL(
	ctx context.Context, input PutObjectPresignedURLInput) (string, error) {
	request, err := self.presignClient.PresignPutObject(ctx, &s3.PutObjectInput{
		Bucket:        aws.String(self.bucketName),
		Key:           aws.String(input.ObjectKey),
		ContentType:   aws.String(input.ContentType),
		ContentLength: aws.Int64(input.ContentLength),
	}, func(opts *s3.PresignOptions) {
		opts.Expires = time.Duration(input.LifetimeSecs * int64(time.Second))
	})
	if err != nil {
		return "", fmt.Errorf("put object: object key %v: %v", input.ObjectKey, err)
	}

	url := strings.Replace(request.URL, self.s3InternalEndpointUrl, self.s3PublicEndpointUrl, 1)
	return url, err
}
