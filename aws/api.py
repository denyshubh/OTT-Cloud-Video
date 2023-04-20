#!/usr/bin/env python3

import boto3

# Initialize a boto3 API Gateway client
client = boto3.client('apigateway')

# Create a new REST API
response = client.create_rest_api(
    name='OTTPlatformAPI',
    description='API for OTT Platform'
)

# Store the API ID
api_id = response['id']

# Get the root resource ID
response = client.get_resources(
    restApiId=api_id
)
root_resource_id = response['items'][0]['id']

# Function to create a new resource and method


def create_resource_and_method(resource_name, parent_resource_id, method, api_key_required=False):
    '''
    Create a new resource and method for the resource
    '''
    res = client.create_resource(
        restApiId=api_id,
        parentId=parent_resource_id,
        pathPart=resource_name
    )
    resource_id = res['id']

    client.put_method(
        restApiId=api_id,
        resourceId=resource_id,
        httpMethod=method,
        authorizationType='NONE',
        apiKeyRequired=api_key_required
    )

    return resource_id


# Create resources and methods
videos_resource_id = create_resource_and_method(
    'videos', root_resource_id, 'GET')
create_resource_and_method('video', videos_resource_id, 'GET')
create_resource_and_method('video-create', videos_resource_id, 'POST')
create_resource_and_method('video-update', videos_resource_id, 'PUT')
create_resource_and_method('video-delete', videos_resource_id, 'DELETE')

users_resource_id = create_resource_and_method(
    'users', root_resource_id, 'GET')
create_resource_and_method('user', users_resource_id, 'GET')
create_resource_and_method('user-update', users_resource_id, 'PUT')

watchlist_resource_id = create_resource_and_method(
    'watchlist', users_resource_id, 'GET')
create_resource_and_method('video-add', watchlist_resource_id, 'POST')
create_resource_and_method('video-remove', watchlist_resource_id, 'DELETE')

subscription_resource_id = create_resource_and_method(
    'subscription', users_resource_id, 'GET')
create_resource_and_method('subscription-create',
                           subscription_resource_id, 'POST')
create_resource_and_method('subscription-update',
                           subscription_resource_id, 'PUT')
create_resource_and_method('subscription-delete',
                           subscription_resource_id, 'DELETE')

recommendations_resource_id = create_resource_and_method(
    'recommendations', users_resource_id, 'GET')
create_resource_and_method(
    'video-recommend', recommendations_resource_id, 'POST')

events_resource_id = create_resource_and_method(
    'events', root_resource_id, 'POST')

# Deploy the API
client.create_deployment(
    restApiId=api_id,
    stageName='dev'
)

print(f"API Gateway created and deployed with ID: {api_id}")
