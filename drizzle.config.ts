import dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit';

dotenv.config();

export default defineConfig({
	schema: './src/db/schema.ts',
	dialect: 'postgresql',
	out: './src/db/migrations/drizzle',
	dbCredentials: {
		url: process.env.DB_CONNECTION_STRING!,
	},
	verbose: true,
	strict: true,
});
