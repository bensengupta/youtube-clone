package video

import (
	"context"
	"log/slog"
	"os"

	"github.com/bensengupta/youtube-clone/clients"
)

type S3VideoUploadConsumerHandler struct {
	Log          *slog.Logger
	SQSClient    clients.SQSClient
	VideoService VideoService
}

func NewS3VideoUploadConsumerHandler(log *slog.Logger, sqs clients.SQSClient, vs VideoService) S3VideoUploadConsumerHandler {
	return S3VideoUploadConsumerHandler{
		Log:          log,
		SQSClient:    sqs,
		VideoService: vs,
	}
}

func (self S3VideoUploadConsumerHandler) StartProcessingEvents(ctx context.Context) error {
	self.Log.Info("Starting to consume s3 event notifications")
	queueName := os.Getenv("AWS_SQS_QUEUE_NAME")
	for {
		notifications, err := self.SQSClient.PollS3EventNotifications(
			ctx,
			clients.PollMessagesInput{
				QueueName:           queueName,
				MaxNumberOfMessages: 10,
				WaitTimeSeconds:     10,
			},
		)
		if err != nil {
			self.Log.Error("Error while consuming s3 event notifications", slog.Any("error", err))
			return err
		}

		for _, notification := range notifications {
			for _, record := range notification.Records {
				self.Log.Info("Processing s3 event notification record", slog.Any("objectKey", record.S3.Object.Key))
				err := self.VideoService.HandleS3UploadEvent(ctx, record.S3.Object.Key)
				if err != nil {
					self.Log.Error("Error while updating video upload", slog.Any("error", err))
					return err
				}
			}
			err := self.SQSClient.DeleteMessage(ctx, queueName, notification.ReceiptHandle)
			if err != nil {
				self.Log.Error("Error while deleting message", slog.Any("error", err))
				return err
			}
		}
	}
}
