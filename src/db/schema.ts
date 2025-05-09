import { bigint, text, pgTable, timestamp, jsonb } from 'drizzle-orm/pg-core';
import { InferSelectModel } from 'drizzle-orm';

export const items = pgTable('item', {
  id: bigint({ mode: 'number' }).primaryKey(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).notNull(),
  images: jsonb('image').notNull().$type<string[]>(),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customData: jsonb('custom_data').default(null).$type<Record<string, any> | null>(),
});

export type Item = InferSelectModel<typeof items>;
