import { AddCustomField } from '@/components/addCustomField';
import { DataTableRow } from '@/components/dataTableRow';
import { ThemeToggle } from '@/components/themeToggle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody } from '@/components/ui/table';
import { db } from '@/db/drizzle';
import { items } from '@/db/schema';
import { eq } from 'drizzle-orm';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: Promise<{ itemId: number }> }) {
  const { itemId } = await params;
  const itemData = await db.select().from(items).where(eq(items.id, itemId));
  if (itemData.length === 0) notFound();

  const { name, images, id, createdAt, updatedAt, customData } = itemData[0];

  return (
    <div className="flex min-h-screen w-screen flex-col">
      <header className="border-b-border flex w-screen items-center border-b px-4 py-2">
        <Link href="/">
          <span className="mr-1 font-bold">{process.env.NEXT_PUBILC_COMPANYNAME}</span>
          Inventory Manager
        </Link>
        <ThemeToggle className="ml-auto" />
      </header>
      <main className="grid flex-1 grid-cols-6 grid-rows-1 gap-4 p-2">
        <Card className="col-span-2 flex flex-col">
          <CardHeader>
            <CardTitle>
              {name} <span className="font-thin">(Images)</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="mx-auto max-h-[calc(100vh-12rem)] w-11/12 flex-1 overflow-y-auto border-t border-b">
            {images.map((image) => {
              return (
                <div
                  key={image}
                  className="border-border relative mx-auto my-4 aspect-video w-full overflow-hidden rounded-md border"
                  style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="z-10 h-full w-full backdrop-blur-sm duration-500"></div>
                  <Image
                    fill={true}
                    src={image}
                    alt={name}
                    className="z-20 object-contain transition-transform duration-[250ms] ease-[cubic-bezier(.17,.67,.83,.67)] hover:scale-105"
                  />
                </div>
              );
            })}
          </CardContent>
        </Card>
        <Card className="col-span-4 flex flex-col">
          <CardHeader>
            <CardTitle>
              {name} <span className="font-thin">(Data)</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex max-h-[calc(100vh-12rem)] flex-1 flex-col items-center gap-2 overflow-y-auto">
            <Table className="border-t border-b">
              <TableBody>
                <DataTableRow itemInternal="id" item="ID" value={id} itemId={id}></DataTableRow>
                <DataTableRow itemInternal="name" item="Name" value={name} itemId={id}></DataTableRow>
                <DataTableRow
                  itemInternal="createdAt"
                  item="Created At"
                  value={createdAt.toISOString()}
                  itemId={id}
                  date
                ></DataTableRow>
                <DataTableRow
                  itemInternal="updatedAt"
                  item="Updated At"
                  value={updatedAt.toISOString()}
                  itemId={id}
                  date
                ></DataTableRow>
                {/* Itterate over the object.keys of customdata so we can display */}
                {/* user-created fields in addition to the hardcoded ones */}
                {customData ? (
                  Object.keys(customData).map((key) => {
                    return (
                      <DataTableRow
                        itemInternal={`customData.${key}`}
                        item={key}
                        key={key}
                        value={customData[key]}
                        itemId={id}
                      />
                    );
                  })
                ) : (
                  <></>
                )}
              </TableBody>
            </Table>
            <AddCustomField itemId={id} />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
