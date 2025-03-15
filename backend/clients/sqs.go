package clients

import (
	"context"
	"encoding/json"
	"fmt"
	"os"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/sqs"
)

type SQSClient struct {
	client        *sqs.Client
	queueUrlCache map[string]string
}

func NewSQSClient(ctx context.Context) (SQSClient, error) {
	cfg, err := config.LoadDefaultConfig(ctx)

	if err != nil {
		return SQSClient{}, fmt.Errorf("create s3 client: %v", err)
	}

	// If this env var is set, we are running in a localstack environment
	s3InternalEndpointUrl := os.Getenv("AWS_ENDPOINT_URL")

	// Create an Amazon S3 service presigner
	client := sqs.NewFromConfig(cfg, func(o *sqs.Options) {
		if s3InternalEndpointUrl != "" {
			o.BaseEndpoint = aws.String(s3InternalEndpointUrl)
		}
	})

	return SQSClient{client: client, queueUrlCache: make(map[string]string)}, nil
}

func (self SQSClient) getQueueUrl(ctx context.Context, queueName string) (string, error) {
	if url, ok := self.queueUrlCache[queueName]; ok {
		return url, nil
	}
	output, err := self.client.GetQueueUrl(ctx, &sqs.GetQueueUrlInput{
		QueueName: aws.String(queueName),
	})
	if err != nil {
		return "", fmt.Errorf("get queue url: %v", err)
	}

	queueUrl := *output.QueueUrl
	self.queueUrlCache[queueName] = queueUrl

	return queueUrl, nil
}

type PollMessagesInput struct {
	QueueName           string
	MaxNumberOfMessages int32
	WaitTimeSeconds     int32
}

type Message struct {
	Body          string
	ReceiptHandle string
}

func (self SQSClient) PollMessages(ctx context.Context, input PollMessagesInput) ([]Message, error) {
	queueUrl, err := self.getQueueUrl(ctx, input.QueueName)
	if err != nil {
		return []Message{}, fmt.Errorf("poll messages from queue %v: %v", input.QueueName, err)
	}

	result, err := self.client.ReceiveMessage(ctx, &sqs.ReceiveMessageInput{
		QueueUrl:            aws.String(queueUrl),
		MaxNumberOfMessages: input.MaxNumberOfMessages,
		WaitTimeSeconds:     input.WaitTimeSeconds,
	})
	if err != nil {
		return []Message{}, fmt.Errorf("poll messages from queue %v: %v", input.QueueName, err)
	}

	var messages []Message
	for _, m := range result.Messages {
		if m.Body == nil || m.ReceiptHandle == nil {
			return []Message{}, fmt.Errorf("poll messages from queue %v: message body or receipt handle is nil", input.QueueName)
		}
		messages = append(messages, Message{
			Body:          *m.Body,
			ReceiptHandle: *m.ReceiptHandle,
		})
	}
	return messages, nil
}

type S3EventNotificationRecord struct {
	EventSource string `json:"eventSource"`
	EventName   string `json:"eventName"`
	S3          struct {
		Bucket struct {
			Name string `json:"name"`
		} `json:"bucket"`
		Object struct {
			Key string `json:"key"`
		} `json:"object"`
	} `json:"s3"`
}

type S3EventNotification struct {
	ReceiptHandle string
	Records       []S3EventNotificationRecord `json:"Records"`
}

func (self SQSClient) PollS3EventNotifications(ctx context.Context, input PollMessagesInput) ([]S3EventNotification, error) {
	messages, err := self.PollMessages(ctx, input)
	if err != nil {
		return []S3EventNotification{}, fmt.Errorf("poll s3 event notifications: %v", err)
	}

	var notifications []S3EventNotification
	for _, m := range messages {
		notif := S3EventNotification{
			ReceiptHandle: m.ReceiptHandle,
		}
		err = json.Unmarshal([]byte(m.Body), &notif)
		if err != nil {
			return []S3EventNotification{}, fmt.Errorf("poll s3 event notifications: %v", err)
		}
		notifications = append(notifications, notif)
	}
	return notifications, nil
}

func (self SQSClient) DeleteMessage(ctx context.Context, queueName string, receiptHandle string) error {
	queueUrl, err := self.getQueueUrl(ctx, queueName)
	if err != nil {
		return fmt.Errorf("delete message from queue %v: %v", queueName, err)
	}

	_, err = self.client.DeleteMessage(ctx, &sqs.DeleteMessageInput{
		QueueUrl:      aws.String(queueUrl),
		ReceiptHandle: aws.String(receiptHandle),
	})
	if err != nil {
		return fmt.Errorf("delete message from queue %v: %v", queueName, err)
	}

	return nil
}
