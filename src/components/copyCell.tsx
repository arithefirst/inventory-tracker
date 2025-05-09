'use client';

import { Button } from '@/components/ui/button';
import { Clipboard } from 'lucide-react';
import { TableCell } from './ui/table';

export function CopyCell({ value }: { value: string | number }) {
  async function copy() {
    try {
      await navigator.clipboard.writeText(value.toString());
      console.log('Text copied to clipboard');
    } catch (err) {
      console.error('Error in copying text: ', err);
      // You might want to show a user-friendly message indicating the copy failed
    }
  }

  return (
    <TableCell>
      <Button onClick={copy} size="sm" className="text-foreground my-auto cursor-pointer">
        Copy
        <Clipboard />
      </Button>
    </TableCell>
  );
}
