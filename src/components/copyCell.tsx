'use client';

import { Button } from '@/components/ui/button';
import { Clipboard, ClipboardCheck, ClipboardX } from 'lucide-react';
import { TableCell } from './ui/table';
import { toast } from 'sonner';

export function CopyCell({ value, property }: { value: string | number; property?: string }) {
  async function copy() {
    try {
      await navigator.clipboard.writeText(value.toString());
      toast(`"${property ? property.charAt(0).toUpperCase() + property.slice(1) : 'Text'}" copied to clipboard.`, {
        icon: <ClipboardCheck />,
      });
    } catch (err) {
      console.error('Error in copying text: ', err);
      toast('Failed to copy to clipboard. See console for details.', {
        icon: <ClipboardX />,
      });
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
