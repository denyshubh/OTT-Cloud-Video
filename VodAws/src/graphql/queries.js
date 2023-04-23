/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getVodAsset = /* GraphQL */ `
  query GetVodAsset($id: ID!) {
    getVodAsset(id: $id) {
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
export const listVodAssets = /* GraphQL */ `
  query ListVodAssets(
    $filter: ModelVodAssetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVodAssets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getVideoObject = /* GraphQL */ `
  query GetVideoObject($id: ID!) {
    getVideoObject(id: $id) {
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
export const listVideoObjects = /* GraphQL */ `
  query ListVideoObjects(
    $filter: ModelVideoObjectFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVideoObjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
