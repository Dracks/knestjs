import { Snapshot } from '../../src/services/migrations.service'

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
        },
        {
          "length": 10,
          "nullable": true,
          "property": "something-to-remove",
          "type": 'varchar'
        },
        {
          "length": 255,
          "nullable": false,
          "property": "user",
          "type": "varchar",
        },
        {
          "length": 51,
          "nullable": true,
          "property": "password",
          "type": "char",
        },
        {
          "nullable": false,
          "property": "created",
          "type": "datetime",
        },
      ],
      "indexes": [
        {
          "fields": [
            "user" as never,
          ],
          "name": "user_idx",
        },
        {
          "fields": [
            "something-to-remove" as never,
          ],
          "name": "str_idx",
        },
      ],
      "name": "UserModel",
    },
  },
  "knestVersion": "",
}
