import { Snapshot, TableSnapshot } from '../../src/migrations/snapshot.types'

export const oldSnapshot1: Snapshot = {
    version: 1,
  "db": {
    UserModel: {
      "className": "UserModel",
      "columns": [
        {
          "autoincrement": true,
          "nullable": false,
          "primaryKey": true,
          "property": "id",
          "type": "int",
          "name": "id"
        },
        {
          "length": 10,
          "nullable": true,
          "property": "something-to-remove",
          "type": 'varchar',
          "name": 'to-remove'
        },
        {
          "length": 255,
          "nullable": false,
          "property": "user",
          "type": "varchar",
          "name": "user"
        },
        {
          "length": 51,
          "nullable": true,
          "property": "password",
          "type": "char",
          "name": 'password',
        },
        {
            "name": 'created',
          "nullable": false,
          "property": "created",
          "type": "datetime",
        },
      ],
      "indexes": [
        {
          "columns": [ "user",],
          "name": "user_idx",
        },
        {
          "columns": [ "something-to-remove", ],
          "name": "str_idx",
        },
      ],
      "name": "UserModel",
  } as TableSnapshot<unknown>,
  },
  "knestVersion": "",
}
