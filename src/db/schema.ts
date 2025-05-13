import { InferSelectModel } from 'drizzle-orm';
import { bigint, index, jsonb, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const items = pgTable(
  'item',
  {
    id: bigint({ mode: 'number' }).primaryKey(),
    name: text('name').notNull(),
    createdAt: timestamp('created_at', { mode: 'date' }).notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' }).notNull(),
    images: jsonb('image').notNull().$type<string[]>(),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    customData: jsonb('custom_data').default(null).$type<Record<string, any> | null>(),
  },
  (table) => [
    index('item_search_index').using(
      'gin',
      sql`to_tsvector('english', ${table.name} || ' ' || ${table.id} || ' ' || COALESCE(${table.customData}::text, ''))`,
    ),
  ],
);

export type Item = InferSelectModel<typeof items>;
