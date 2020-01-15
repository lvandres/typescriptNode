import { ConnectionOptions } from 'typeorm';
const dirBase = process.env.PRODUCTION ? 'dist/database' : 'database';

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
		`${dirBase}/entity/*.ts`,
		`${dirBase}/entity/*.js`
	],
	'subscribers': [
		`${dirBase}/subscriber/*.ts`,
		`${dirBase}/subscriber/*.js`
	],
	'migrations': [
		`${dirBase}/migration/*.ts`,
		`${dirBase}/migration/*.js`
	],
	'cli': {
		'entitiesDir': `${dirBase}/entity`,
		'migrationsDir': `${dirBase}/migration`,
		'subscribersDir': `${dirBase}/subscriber`
	}
};