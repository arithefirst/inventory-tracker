import { InventoryItem } from '@/components/inventoryItem';
import { ThemeToggle } from '@/components/themeToggle';
import { db } from '@/db/drizzle';
import { items } from '@/db/schema';

export default async function Home() {
  const inventory = await db.select().from(items);

  return (
    <div className="flex min-h-screen w-screen flex-col">
      <header className="border-b-border flex w-screen items-center border-b p-2">
        <p>
          <span className="mr-1 font-bold">{process.env.NEXT_PUBILC_COMPANYNAME}</span>
          Inventory Manager
        </p>
        <ThemeToggle className="ml-auto" />
      </header>
      {inventory.length === 0 ? (
        <main className="flex flex-1 items-center justify-center">
          <h1 className="text-foreground/40 text-3xl">No items in inventory.</h1>
        </main>
      ) : (
        <main className="grid grid-cols-4 gap-2 p-2">
          {inventory.map((item) => (
            <InventoryItem {...item} key={item.id} />
          ))}
        </main>
      )}
    </div>
  );
}
