import { Search } from 'lucide-react';
import { Input } from './ui/input';

interface SearchBarProps {
  className?: string;
}

export function SearchBar({ className }: SearchBarProps) {
  return (
    <div
      className={
        'focus-within:border-ring border-input bg-input focus-within:ring-ring/50 flex h-8 w-64 items-center rounded-md border px-4 transition-[color,box-shadow] focus-within:ring-[3px] md:w-72' +
        ' ' +
        className
      }
    >
      <Search />
      <Input
        placeholder="Search..."
        className="h-full min-h-0 flex-grow border-0 bg-transparent! shadow-none focus-visible:ring-0"
      />
    </div>
  );
}
