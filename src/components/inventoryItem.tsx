import type { Item } from '@/db/schema';
import Image from 'next/image';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export function InventoryItem({ id, name, createdAt, image, customData }: Item) {
  return (
    <Card className="cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-2.5 hover:shadow-xl">
      <CardContent>
        <p className="w-full text-center font-bold">{name}</p>
        <div className="relative mx-auto aspect-square w-3/4 object-cover">
          <Image fill={true} src={image} alt={name} />
        </div>
        <p className="text-foreground/40 w-full text-center italic">{id}</p>
      </CardContent>
    </Card>
  );
}
