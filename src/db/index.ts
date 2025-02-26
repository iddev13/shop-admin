import dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/node-postgres';
import pkg from 'pg';
import * as schema from './schema';

dotenv.config();

const { Client } = pkg;

export const pgClient = new Client({
	host: '127.0.0.1',
	port: 5432,
	user: 'postgres',
	password: 'root',
	database: 'shop_admin',
	// connectionTimeoutMillis: 5000, // 5 seconds
});

const main = async () => {
	await pgClient
		.connect()
		.then(() => console.log('Connected to PostgreSQL'))
		.catch((err) => {
			console.error('Error connecting to PostgreSQL', err);
		});
};

main();

export const db = drizzle(pgClient, { schema });