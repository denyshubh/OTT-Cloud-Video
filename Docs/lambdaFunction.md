# Ingest workflow (5 lambda)

- Input Validate - Parses the input to the workflow, checks for the source video file, and defines the
  workflow configuration using the AWS Lambda function environment variables. If turned on, this
  step downloads the metadata file and overwrites the default environment variables with the variable
  definitions in the metadata file (metadata and video version only). For more information, refer to
  Metadata file (p. 23).
- MediaInfo - Generates a signed Amazon S3 URL for the source video and runs MediaInfo to extract
  metadata about the video.
- DynamoDB Update - Takes accumulated data from each step and stores it in Amazon DynamoDB.
- SNS Notification - Sends an Amazon Simple Notification Service (Amazon SNS) notification with a
  summary of the ingest process.
- Process Execute - Starts the processing workflow

### Lambda Functions Deployed

- cloud-streaming-platform-input-validate
- cloud-streaming-platform-mediainfo
- cloud-streaming-platform-dynamo
- cloud-streaming-platform-step-functions
- cloud-streaming-platform-sns-notification

# Processing workflow

- Profiler – Gets the source video’s height and width from the metadata file, defines the settings for
  frame capture (if turned on), and chooses which template to use for encoding based on the source
  video’s height. For example, if the source video is greater than or equal to 1080p, the 1080p job
  template will be used.
- Encoding Profile Check, Accelerated Transcoding Check, and Frame Capture Check – Helps visualize
  which settings the profiler step applied.
- Encode Job Submit – Submits the encoding job with the template defined by the profiler to AWS
  Elemental MediaConvert.
- DynamoDB Update – Takes accumulated data from each step and stores it in Amazon DynamoDB

### Lambda Functions Deployed (3)

- cloud-streaming-platform-profiler
- cloud-streaming-platform-encode
- cloud-streaming-platform-dynamo

# Publishing workflow

- Output Validate - Checks the event data for the completed encoding job, gets the GUID from the AWS
  Elemental MediaConvert notification, gets the asset details from Amazon DynamoDB, and generates
  the Amazon Simple Storage Service (Amazon S3) and Amazon CloudFront URLs for the MediaConvert
  outputs.
- Archive Choice - If Glacier or Glacier Deep Archive was activated, this step tags the source video with a
  unique identifier and the archive to invoke the Amazon S3 Glacier lifecycle policy.
- MediaPackage Choice - If you configure the solution to use AWS Elemental MediaPackage, this step
  takes the output from MediaConvert and uses it as a source for a MediaPackage asset, which contains
  all the information MediaPackage requires to ingest file-based video content.
- DynamoDB Update - Updates Amazon DynamoDB table with the event data.
- SQS Choice – If activated, this step sends all workflow outputs to an SQS queue that is ingested into
  upstream workflows or processes.
- SNS Choice – If activated, this step sends an Amazon SNS notification with a summary of the workflow
  and the Amazon CloudFront URLs.

### Lambda Functions Deployed (6)

- cloud-streaming-platform-output-validate
- cloud-streaming-platform-archive-source (used for both "Archive" and "Deep Archive" states)
- cloud-streaming-platform-media-package-assets
- cloud-streaming-platform-dynamo
- cloud-streaming-platform-sqs-publish
- cloud-streaming-platform-sns-notification
