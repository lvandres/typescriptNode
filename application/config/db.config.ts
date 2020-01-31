import { ConnectionOptions } from 'typeorm';
const dirBase = process.env.NODE_ENV === 'production' ? 'dist/database' : 'database';

export const DB_CONFIG: ConnectionOptions = {
	'name': 'default',
	'type': 'postgres',
	'host': process.env.POSTGRES_HOST,
	'port': 5432,
	'username': process.env.POSTGRES_USER,
	'password': process.env.POSTGRES_PASSWORD,
	'database': process.env.POSTGRES_DB,
	'synchronize': true,
	'logging': false,
	'entities': [
		`${dirBase}/entity/*{.ts,.j_s}`
	],
	'subscribers': [
		`${dirBase}/subscriber/*{.ts,.j_s}`
	],
	'migrations': [
		`${dirBase}/migration/*{.ts,.j_s}`
	],
	'cli': {
		'entitiesDir': `${dirBase}/entity`,
		'migrationsDir': `${dirBase}/migration`,
		'subscribersDir': `${dirBase}/subscriber`
	}
};