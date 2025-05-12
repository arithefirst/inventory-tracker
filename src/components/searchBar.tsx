'use client';

import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { useState } from 'react';
import { BlurIn } from './blurIn';
import { AnimatePresence } from 'motion/react';
import { Loader } from 'lucide-react';

interface SearchBarProps {
  className?: string;
}

export function SearchBar({ className }: SearchBarProps) {
  const [isFocused, setFocus] = useState<boolean>(false);

  return (
    <div className={'z-10 w-64 md:w-72' + ' ' + className}>
      <div className="relative w-full">
        <div className="focus-within:border-ring border-input bg-input focus-within:ring-ring/50 flex h-8 items-center rounded-md border px-4 transition-[color,box-shadow] focus-within:ring-[3px]">
          <Search />
          <Input
            placeholder="Search..."
            className="h-full min-h-0 flex-grow border-0 bg-transparent! shadow-none focus-visible:ring-0"
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
          />
        </div>
        <AnimatePresence>
          {isFocused ? (
            <BlurIn
              delay={0}
              childKey="searchbox"
              className="bg-card border-border absolute left-1/2 mt-2 w-72 -translate-x-1/2 rounded-md border p-2 md:w-80"
            >
              <Loader className="mx-auto my-4 animate-spin" />
            </BlurIn>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
