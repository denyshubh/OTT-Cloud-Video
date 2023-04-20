import boto3
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI()

# Initialize AWS clients
dynamodb = boto3.resource('dynamodb')
s3 = boto3.client('s3')
mediaconvert = boto3.client('mediaconvert')


class Video(BaseModel):
    video_id: str
    title: str
    description: Optional[str] = None
    category: Optional[str] = None
    thumbnail_url: Optional[str] = None
    playback_url: Optional[str] = None


DYNAMODB_TABLE_NAME = "your_dynamodb_table_name"
S3_BUCKET_NAME = "your_s3_bucket_name"


@app.get("/videos", response_model=List[Video])
async def get_videos():
    table = dynamodb.Table(DYNAMODB_TABLE_NAME)
    response = table.scan()
    return response['Items']


@app.get("/videos/{video_id}", response_model=Video)
async def get_video(video_id: str):
    table = dynamodb.Table(DYNAMODB_TABLE_NAME)
    response = table.get_item(Key={"video_id": video_id})

    if "Item" not in response:
        raise HTTPException(status_code=404, detail="Video not found")

    return response['Item']


@app.post("/videos", response_model=Video)
async def upload_video_metadata(video: Video):
    table = dynamodb.Table(DYNAMODB_TABLE_NAME)
    table.put_item(Item=video.dict())
    return video


@app.put("/videos/{video_id}", response_model=Video)
async def update_video_metadata(video_id: str, video: Video):
    table = dynamodb.Table(DYNAMODB_TABLE_NAME)
    response = table.update_item(
        Key={"video_id": video_id},
        UpdateExpression="SET title=:title, description=:description, category=:category, thumbnail_url=:thumbnail_url, playback_url=:playback_url",
        ExpressionAttributeValues={
            ":title": video.title,
            ":description": video.description,
            ":category": video.category,
            ":thumbnail_url": video.thumbnail_url,
            ":playback_url": video.playback_url,
        },
        ReturnValues="ALL_NEW"
    )

    if "Attributes" not in response:
        raise HTTPException(status_code=404, detail="Video not found")

    return response['Attributes']


@app.delete("/videos/{video_id}")
async def delete_video(video_id: str):
    table = dynamodb.Table(DYNAMODB_TABLE_NAME)
    response = table.delete_item(Key={"video_id": video_id})

    if response['ResponseMetadata']['HTTPStatusCode'] != 200:
        raise HTTPException(status_code=404, detail="Video not found")

    return {"detail": "Video deleted"}


# from fastapi.middleware.cors import CORSMiddleware

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # or specify your frontend domain
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )
