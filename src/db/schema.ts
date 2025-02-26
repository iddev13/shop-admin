import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';

export const stores = pgTable('stores', {
	id: text('id').primaryKey(),
	userId: text('user_id').notNull(),
	name: text('name').unique().notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updateAt: timestamp('update_at').notNull().defaultNow(),
});

export const billboards = pgTable('billboards', {
	id: text('id').primaryKey(),
	storeId: text('store_id').notNull().references(() => stores.id),
	label: text('label').unique().notNull(),
	imageUrl: text('image_url').unique().notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updateAt: timestamp('update_at').notNull().defaultNow(),
});

export const insertStoresSchema = createInsertSchema(stores);
export const insertBillboardsSchema = createInsertSchema(billboards);
