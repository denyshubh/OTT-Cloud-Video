# Customization of Video Solution From AWS for our Cloud Streaming App

### Environment Variables:
- ***Archive Source:*** If enabled, the source video file will be tagged for archiving to glacier at the end of the workflow
- ***CloudFront:*** CloudFront domain name, used to generate the playback URLs for the MediaConvert outputs
- ***Destination:*** The name of the destination S3 bucket for all of the MediaConvert outputs
- ***FrameCapture:*** If enabled frame capture is added to the job submitted to MediaConvert
- ***InputRotate:*** Defines how the MediaConvert rotates your video
- ***MediaConvert_Template_2160p:*** The name of the UHD template in MediaConvert
- ***MediaConvert_Template_1080p:*** The name of the HD template in MediaConvert
- ***MediaConvert_Template_720p:*** The name of the SD template in MediaConvert
- ***Source:*** The name of the source S3 bucket
- ***WorkflowName:*** Used to tag all of the MediaConvert encoding jobs
- ***acceleratedTranscoding:*** Enabled Accelerated Transocding in MediaConvert. options include ENABLE, DISABLE, PREFERRED. for more detials please see:
- ***enableSns:*** Send SNS notifications for the workflow results.
- ***enableSqs:*** Send the workflow results to an SQS queue

### WorkFlow Triggers

#### Source Video Option
If deployed with the workflow trigger parameter set to VideoFile, the CloudFormation template will configure S3 event notifications on the source S3 bucket to trigger the workflow whenever a video file ***(mpg, mp4, m4v, mov, or m2ts)*** is uploaded.

#### Source Metadata Option
If deployed with the workflow trigger parameter set to MetadataFile, the S3 notification is configured to trigger the workflow whenever a JSON file is uploaded. This allows different workflow configuration to be defined for each source video processed by the workflow.

> **Important:** The source video file must be uploaded to S3 before the metadata file is uploaded, and the metadata file must be valid JSON with a .json file extension. With source metadata enabled uploading video files to Amazon S3 will not trigger the workflow.

The solution also supports adding additional metadata, such as title, genre, or any other information, you want to store in Amazon DynamoDB.

## Encoding Templates
At launch the Solution creates 3 MediaConvert job templates which are used as the default encoding templates for the workflow:
- **MediaConvert_Template_2160p**
- **MediaConvert_Template_1080p**
- **MediaConvert_Template_720p**

By default, the ***PROFILER step*** in the process step function will check the source video height and set the parameter "jobTemplate" to one of the available templates. This variable is then passed to the encoding step which submits a job to Elemental MediaConvert. To customize the encoding templates used by the solution you can either replace the existing templates or you can use the source metadata version of the workflow and define the jobTemplate as part of the source metadata file.

## QVBR Mode
AWS MediaConvert Quality-defined Variable Bit-Rate (QVBR) control mode gets the best video quality for a given file size and is recommended for OTT and Video On Demand Content. The solution supports this feature and it will create HLS, MP4 and DASH custom presets with the following QVBR levels and Single Pass HQ encoding:

| Resolution   |      MaxBitrate      |  QvbrQualityLevel |
|----------|:-------------:|------:|
| 2160p |  15000Kbps | 9 |
| 1080p |  8500Kbps  | 8 |
| 720p  |  6000Kbps  | 8 |
| 720p  |  5000Kbps  | 8 |
| 540p  |  3500Kbps  | 7 |
| 360p  |  1500Kbps  | 7 |
| 270p  |  400Kbps   | 7 |

For more detail please see [QVBR and MediaConvert](https://docs.aws.amazon.com/mediaconvert/latest/ug/cbr-vbr-qvbr.html).


## Source code

### Node.js 14
* **archive-source:** Lambda function to tag the source video in s3 to enable the Glacier lifecycle policy.
* **custom-resource:** Lambda backed CloudFormation custom resource to deploy MediaConvert templates configure S3 event notifications.
* **dynamo:** Lambda function to Update DynamoDB.
* **encode:** Lambda function to submit an encoding job to Elemental MediaConvert.
* **error-handler:** Lambda function to handler any errors created by the workflow or MediaConvert.
* **input-validate:** Lambda function to parse S3 event notifications and define the workflow parameters.
* **media-package-assets:** Lambda function to ingest an asset into MediaPackage-VOD.
* **output-validate:** Lambda function to parse MediaConvert CloudWatch Events.
* **profiler:** Lambda function used to send publish and/or error notifications.
* **step-functions:** Lambda function to trigger AWS Step Functions.

### Python 3.8
* **mediainfo:** Lambda function to run [mediainfo](https://mediaarea.net/en/MediaInfo) on an S3 signed url.
[Source Code](https://github.com/aws-solutions/video-on-demand-on-aws/tree/main/source/mediainfo)

## Future Scopes We Can DO To Improve Our Exsisting Solution
- [Live Streaming On AWS](https://aws.amazon.com/solutions/live-streaming-on-aws/)
- [Media Analysis Solution](https://aws.amazon.com/solutions/media-analysis-solution/)
- [Live Streaming and Live to VOD Workshop](https://github.com/awslabs/speke-reference-server)
- [Live to VOD with Machine Learning](https://github.com/aws-samples/aws-elemental-instant-video-highlights)
- [Demo SPEKE Reference Server](https://github.com/awslabs/speke-reference-server)  Adding security To Our videos so that people cannot record it. 

