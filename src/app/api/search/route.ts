import { db } from '@/db/drizzle';
import { items } from '@/db/schema';
import { sql } from 'drizzle-orm';
import { type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const query: string | null = request.nextUrl.searchParams.get('q');

  if (!query)
    return new Response(JSON.stringify({ error: 'Missing query' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    });

  try {
    const tsvectorExpression = sql`to_tsvector('english', ${items.name} || ' ' || ${items.id} || ' ' || COALESCE(${items.customData}::text, ''))`;
    const tsqueryExpression = sql`websearch_to_tsquery('english', ${query})`;

    const results = await db
      .select({
        id: items.id,
        rank: sql`ts_rank(${tsvectorExpression}, ${tsqueryExpression})`,
      })
      .from(items)
      .where(sql`${tsvectorExpression} @@ ${tsqueryExpression}`);

    return new Response(JSON.stringify({ results }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
