import { integer, text, pgTable, timestamp, jsonb } from 'drizzle-orm/pg-core';
import { InferSelectModel } from 'drizzle-orm';

export const items = pgTable('item', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).notNull(),
  image: text('image').notNull(),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customData: jsonb('custom_data').$type<Record<string, any> | null>().default(null),
});

export type Item = InferSelectModel<typeof items>;
