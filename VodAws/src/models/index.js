// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { vodAsset, videoObject } = initSchema(schema);

export {
  vodAsset,
  videoObject
};