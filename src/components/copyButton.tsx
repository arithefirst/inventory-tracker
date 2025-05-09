'use client';

import { Copy, ClipboardCheck, ClipboardX } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner';

export function CopyButton({ toCopy }: { toCopy: string | number }) {
  async function copy() {
    try {
      await navigator.clipboard.writeText(toCopy.toString());
      toast('Successfully copied to clipboard', {
        icon: <ClipboardCheck />,
      });
    } catch (err) {
      console.error('Error in copying text: ', err);
      toast('Failed to copy to clipboard. See console for details.', { icon: <ClipboardX /> });
    }
  }

  return (
    <Button size={'icon'} className="ml-2 cursor-pointer" onClick={copy} title="Copy value to clipboard">
      <Copy />
    </Button>
  );
}
