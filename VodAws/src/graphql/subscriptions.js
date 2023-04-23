/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateVodAsset = /* GraphQL */ `
  subscription OnCreateVodAsset($filter: ModelSubscriptionVodAssetFilterInput) {
    onCreateVodAsset(filter: $filter) {
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
export const onUpdateVodAsset = /* GraphQL */ `
  subscription OnUpdateVodAsset($filter: ModelSubscriptionVodAssetFilterInput) {
    onUpdateVodAsset(filter: $filter) {
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
export const onDeleteVodAsset = /* GraphQL */ `
  subscription OnDeleteVodAsset($filter: ModelSubscriptionVodAssetFilterInput) {
    onDeleteVodAsset(filter: $filter) {
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
export const onCreateVideoObject = /* GraphQL */ `
  subscription OnCreateVideoObject(
    $filter: ModelSubscriptionVideoObjectFilterInput
  ) {
    onCreateVideoObject(filter: $filter) {
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
export const onUpdateVideoObject = /* GraphQL */ `
  subscription OnUpdateVideoObject(
    $filter: ModelSubscriptionVideoObjectFilterInput
  ) {
    onUpdateVideoObject(filter: $filter) {
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
export const onDeleteVideoObject = /* GraphQL */ `
  subscription OnDeleteVideoObject(
    $filter: ModelSubscriptionVideoObjectFilterInput
  ) {
    onDeleteVideoObject(filter: $filter) {
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
