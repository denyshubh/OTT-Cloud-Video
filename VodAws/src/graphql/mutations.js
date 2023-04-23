/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createVodAsset = /* GraphQL */ `
  mutation CreateVodAsset(
    $input: CreateVodAssetInput!
    $condition: ModelVodAssetConditionInput
  ) {
    createVodAsset(input: $input, condition: $condition) {
      id
      title
      description
      video {
        id
        video {
          id
          title
          description
          createdAt
          updatedAt
          vodAssetVideoId
        }
        token
        createdAt
        updatedAt
        videoObjectVideoId
      }
      createdAt
      updatedAt
      vodAssetVideoId
    }
  }
`;
export const updateVodAsset = /* GraphQL */ `
  mutation UpdateVodAsset(
    $input: UpdateVodAssetInput!
    $condition: ModelVodAssetConditionInput
  ) {
    updateVodAsset(input: $input, condition: $condition) {
      id
      title
      description
      video {
        id
        video {
          id
          title
          description
          createdAt
          updatedAt
          vodAssetVideoId
        }
        token
        createdAt
        updatedAt
        videoObjectVideoId
      }
      createdAt
      updatedAt
      vodAssetVideoId
    }
  }
`;
export const deleteVodAsset = /* GraphQL */ `
  mutation DeleteVodAsset(
    $input: DeleteVodAssetInput!
    $condition: ModelVodAssetConditionInput
  ) {
    deleteVodAsset(input: $input, condition: $condition) {
      id
      title
      description
      video {
        id
        video {
          id
          title
          description
          createdAt
          updatedAt
          vodAssetVideoId
        }
        token
        createdAt
        updatedAt
        videoObjectVideoId
      }
      createdAt
      updatedAt
      vodAssetVideoId
    }
  }
`;
export const createVideoObject = /* GraphQL */ `
  mutation CreateVideoObject(
    $input: CreateVideoObjectInput!
    $condition: ModelVideoObjectConditionInput
  ) {
    createVideoObject(input: $input, condition: $condition) {
      id
      video {
        id
        title
        description
        video {
          id
          token
          createdAt
          updatedAt
          videoObjectVideoId
        }
        createdAt
        updatedAt
        vodAssetVideoId
      }
      token
      createdAt
      updatedAt
      videoObjectVideoId
    }
  }
`;
export const updateVideoObject = /* GraphQL */ `
  mutation UpdateVideoObject(
    $input: UpdateVideoObjectInput!
    $condition: ModelVideoObjectConditionInput
  ) {
    updateVideoObject(input: $input, condition: $condition) {
      id
      video {
        id
        title
        description
        video {
          id
          token
          createdAt
          updatedAt
          videoObjectVideoId
        }
        createdAt
        updatedAt
        vodAssetVideoId
      }
      token
      createdAt
      updatedAt
      videoObjectVideoId
    }
  }
`;
export const deleteVideoObject = /* GraphQL */ `
  mutation DeleteVideoObject(
    $input: DeleteVideoObjectInput!
    $condition: ModelVideoObjectConditionInput
  ) {
    deleteVideoObject(input: $input, condition: $condition) {
      id
      video {
        id
        title
        description
        video {
          id
          token
          createdAt
          updatedAt
          videoObjectVideoId
        }
        createdAt
        updatedAt
        vodAssetVideoId
      }
      token
      createdAt
      updatedAt
      videoObjectVideoId
    }
  }
`;
