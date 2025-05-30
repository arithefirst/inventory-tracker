import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import type { Item } from '@/db/schema';
import Image from 'next/image';
import Link from 'next/link';

export function InventoryItem({ id, name, createdAt, updatedAt, images, customData }: Item) {
  function formatDate(date: Date): string {
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  }

  return (
    <Link href={`/item/${id}`}>
      <Card className="hover:border-primary hover:shadow-primary/30 h-full cursor-pointer transition-all duration-300 ease-in-out hover:shadow-xl">
        <CardContent>
          <p className="w-full text-center font-bold">{name}</p>
          <div className="grid grid-cols-2">
            <div className="relative mx-auto my-4 aspect-square w-3/4 rounded-md border object-cover">
              <Image fill={true} src={images[0]} alt={name} className="rounded-md" />
            </div>
            <Table className="mx-auto my-4 w-fit">
              <TableBody>
                <TableRow>
                  <TableCell className="font-bold">ID</TableCell>
                  <TableCell>{id}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-bold">Created At</TableCell>
                  <TableCell>{formatDate(createdAt)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-bold">Updated At</TableCell>
                  <TableCell>{formatDate(updatedAt)}</TableCell>
                </TableRow>
                {/* Itterate over the object.keys of customdata so we can display */}
                {/* user-created fields in addition to the hardcoded ones */}
                {customData ? (
                  Object.keys(customData).map((key) => {
                    return (
                      <TableRow key={key}>
                        <TableCell className="font-bold">{key}</TableCell>
                        <TableCell>{`${customData[key]}`}</TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <></>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
