import { db, pgClient } from '@/db';
import dotenv from 'dotenv';
import { migrate } from 'drizzle-orm/node-postgres/migrator';

dotenv.config();

async function main() {
	try {
		console.log('Migration Start');
		await migrate(db, { migrationsFolder: './src/db/migrations/drizzle' });
		await pgClient.end();
		console.log('Migrations complete');
	} catch (error) {
		console.log(error);
	}
}

main();
