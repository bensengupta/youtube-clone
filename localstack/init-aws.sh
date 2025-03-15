#!/bin/bash

cd `dirname $0`

# Create S3 bucket
awslocal s3 mb "s3://$AWS_S3_BUCKET_NAME"
awslocal s3api put-bucket-cors --bucket $AWS_S3_BUCKET_NAME --cors-configuration file://s3-bucket-cors-config.json

# Create SQS queue
awslocal sqs create-queue --queue-name $AWS_SQS_QUEUE_NAME

QUEUE_ARN=$(awslocal sqs get-queue-attributes \
  --queue-url "http://localhost:4566/000000000000/${AWS_SQS_QUEUE_NAME}" \
  --attribute-names QueueArn \
  --query 'Attributes.QueueArn' --output text)

awslocal s3api put-bucket-notification-configuration \
    --bucket $AWS_S3_BUCKET_NAME \
    --notification-configuration \
    '{
      "QueueConfigurations": [
         {
           "QueueArn": "'"$QUEUE_ARN"'",
           "Events": ["s3:ObjectCreated:*"]
         }
       ]
     }'

