import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncItem } from "@aws-amplify/datastore";





type EagervodAsset = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<vodAsset, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly video?: videoObject | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly vodAssetVideoId?: string | null;
}

type LazyvodAsset = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<vodAsset, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly video: AsyncItem<videoObject | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly vodAssetVideoId?: string | null;
}

export declare type vodAsset = LazyLoading extends LazyLoadingDisabled ? EagervodAsset : LazyvodAsset

export declare const vodAsset: (new (init: ModelInit<vodAsset>) => vodAsset) & {
  copyOf(source: vodAsset, mutator: (draft: MutableModel<vodAsset>) => MutableModel<vodAsset> | void): vodAsset;
}

type EagervideoObject = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<videoObject, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly vodAsset?: vodAsset | null;
  readonly token?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly videoObjectVodAssetId?: string | null;
}

type LazyvideoObject = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<videoObject, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly vodAsset: AsyncItem<vodAsset | undefined>;
  readonly token?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly videoObjectVodAssetId?: string | null;
}

export declare type videoObject = LazyLoading extends LazyLoadingDisabled ? EagervideoObject : LazyvideoObject

export declare const videoObject: (new (init: ModelInit<videoObject>) => videoObject) & {
  copyOf(source: videoObject, mutator: (draft: MutableModel<videoObject>) => MutableModel<videoObject> | void): videoObject;
}