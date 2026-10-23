import * as migration_20261020_015858_initial from './20261020_015858_initial';
import * as migration_20261023_005416_add_media_object_key from './20261023_005416_add_media_object_key';

export const migrations = [
  {
    up: migration_20261020_015858_initial.up,
    down: migration_20261020_015858_initial.down,
    name: '20261020_015858_initial',
  },
  {
    up: migration_20261023_005416_add_media_object_key.up,
    down: migration_20261023_005416_add_media_object_key.down,
    name: '20261023_005416_add_media_object_key'
  },
];
