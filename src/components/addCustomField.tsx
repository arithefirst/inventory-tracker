'use client';

import { addCustomField } from '@/app/actions';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Loader, Plus } from 'lucide-react';
import { useState } from 'react';
import { Label } from './ui/label';

export function AddCustomField({ itemId }: { itemId: number }) {
  const [field, setField] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [isLoading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [valueError, setValueError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Prevent default form submission
    setFieldError(null);
    setValueError(null);

    if (field.length <= 0) {
      setFieldError('Field name cannot be empty.');
      return;
    }

    if (value.length <= 0) {
      setValueError('Field contents cannot be empty.');
      return;
    }

    setLoading(true);
    await addCustomField(field, value, itemId);
    setLoading(false);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        <Button className="w-1/2 cursor-pointer">
          <Plus />
          Add custom field
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add custom field</DialogTitle>
          <DialogDescription>Adds a new custom data field</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="contents">
          <div>
            <Label htmlFor="customFieldName"></Label>
            <Input
              id="customFieldName"
              placeholder="Field Name"
              value={field}
              onInput={(e) => setField((e.target as HTMLInputElement).value)}
            />
            {fieldError ? <span className="text-sm text-red-700">{fieldError}</span> : ''}
          </div>
          <div>
            <Label htmlFor="customFieldValue"></Label>
            <Input
              id="customFieldValue"
              placeholder="Field Contents"
              value={value}
              onInput={(e) => setValue((e.target as HTMLInputElement).value)}
            />
            {valueError ? <span className="text-sm text-red-700">{valueError}</span> : ''}
          </div>
          <Button type="submit" disabled={isLoading} className="cursor-pointer">
            {isLoading ? <Loader className="animate-spin" /> : 'Create'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
