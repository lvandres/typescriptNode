import { ConnectionOptions } from "typeorm";

export const DB_CONFIG: ConnectionOptions = {
    "name": "default",
    "type": "postgres",
    "host": process.env.POSTGRES_HOST,
    "port": 5432,
    "username": process.env.POSTGRES_USER,
    "password": process.env.POSTGRES_PASSWORD,
    "database": process.env.POSTGRES_DB,
    "synchronize": true,
    "logging": false,
    "entities": [
      "entity/*.ts"
    ],
    "subscribers": [
      "subscriber/*.ts"
    ],
    "migrations": [
      "migration/*.ts"
    ],
    "cli": {
      "entitiesDir": "entity",
      "migrationsDir": "migration",
      "subscribersDir": "subscriber"
    }
}