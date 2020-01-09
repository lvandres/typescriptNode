import { ConnectionOptions } from "typeorm";

export const DB_CONFIG: ConnectionOptions = {
    "name": "default",
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "postgres",
    "password": "test",
    "database": "test",
    "synchronize": true,
    "logging": false,
    "entities": [
      "database/entity/*.ts"
    ],
    "subscribers": [
      "database/subscriber/*.ts"
    ],
    "migrations": [
      "database/migration/*.ts"
    ],
    "cli": {
      "entitiesDir": "database/entity",
      "migrationsDir": "database/migration",
      "subscribersDir": "database/subscriber"
    }
}