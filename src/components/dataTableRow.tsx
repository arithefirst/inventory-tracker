'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TableCell, TableRow } from '@/components/ui/table';
import { Clipboard, ClipboardCheck, ClipboardX, Pencil, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface DataTableRowProps {
  item: string;
  value: string | number;
  itemInternal: string;
}

async function copy(item: string, value: string | number) {
  try {
    await navigator.clipboard.writeText(value.toString());
    toast(`"${item ? item.charAt(0).toUpperCase() + item.slice(1) : 'Text'}" copied to clipboard.`, {
      icon: <ClipboardCheck />,
    });
  } catch (err) {
    console.error('Error in copying text: ', err);
    toast('Failed to copy to clipboard. See console for details.', {
      icon: <ClipboardX />,
    });
  }
}

export function DataTableRow({ item, value }: DataTableRowProps) {
  const [isEditing, setEditing] = useState<boolean>(false);

  useEffect(() => console.log(isEditing), [isEditing]);

  return (
    <TableRow>
      <TableCell className="font-bold">{item}</TableCell>
      {isEditing ? (
        <TableCell className="w-1/2">
          <div className="flex gap-1">
            <Input className="flex-grow" defaultValue={value}></Input>
            <Button className="cursor-pointer">Save</Button>
          </div>
        </TableCell>
      ) : (
        <TableCell>{value}</TableCell>
      )}
      <TableCell className="flex gap-2">
        <Button
          onClick={() => copy(item, value)}
          size="icon"
          className="text-primary-foreground my-auto cursor-pointer"
          title="Copy property value to clipboard"
        >
          <Clipboard />
        </Button>
        <Button
          onClick={() => setEditing((s) => !s)}
          size="icon"
          className="text-primary-foreground my-auto cursor-pointer"
          title="Edit property value"
        >
          {isEditing ? <X /> : <Pencil />}
        </Button>
      </TableCell>
    </TableRow>
  );
}
