'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TableCell, TableRow } from '@/components/ui/table';
import { Clipboard, ClipboardCheck, ClipboardX, Pencil, X, Loader } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { updateDataValue } from '@/app/actions';

interface DataTableRowProps {
  item: string;
  value: string | number;
  itemInternal: string;
  itemId: number;
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

export function DataTableRow({ item, value, itemInternal, itemId }: DataTableRowProps) {
  const [isEditing, setEditing] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string | number>(value);
  const [updateLoading, setUpdateLoading] = useState<boolean>(false);
  const fieldEditable = itemInternal !== 'updatedAt' && itemInternal !== 'createdAt';

  async function executeUpdate() {
    setUpdateLoading(true);
    await updateDataValue(itemInternal, itemId, inputValue);
    setUpdateLoading(false);
    setEditing(false);
  }

  return (
    <TableRow>
      <TableCell className="font-bold">{item}</TableCell>
      {isEditing ? (
        <TableCell className="w-1/2">
          <div className="flex gap-1">
            <Input
              className="flex-grow"
              defaultValue={value}
              onInput={(e) => setInputValue((e.target as HTMLInputElement).value)}
            ></Input>
            <Button className="w-16 cursor-pointer" onClick={executeUpdate}>
              {updateLoading ? <Loader className="animate-spin" /> : 'Save'}
            </Button>
          </div>
        </TableCell>
      ) : (
        <TableCell>{value}</TableCell>
      )}
      <TableCell className="flex gap-2">
        <Button
          onClick={() => copy(item, value)}
          size={fieldEditable ? 'icon' : 'default'}
          className={'text-primary-foreground my-auto cursor-pointer ' + (fieldEditable ? 'w-9' : 'w-20')}
          title="Copy property value to clipboard"
        >
          <Clipboard />
        </Button>

        {fieldEditable ? (
          <Button
            onClick={() => setEditing((s) => !s)}
            size="icon"
            className="text-primary-foreground my-auto cursor-pointer"
            title={isEditing ? 'Cancel edits' : 'Edit property value'}
          >
            {isEditing ? <X /> : <Pencil />}
          </Button>
        ) : (
          <></>
        )}
      </TableCell>
    </TableRow>
  );
}
