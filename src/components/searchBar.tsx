'use client';

import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { useEffect, useState } from 'react';
import { BlurIn } from './blurIn';
import { AnimatePresence } from 'motion/react';
import { Loader } from 'lucide-react';
import type { SearchReturnData } from '@/app/api/search/route';
import Image from 'next/image';
import Link from 'next/link';

interface SearchBarProps {
  className?: string;
}

export function SearchBar({ className }: SearchBarProps) {
  const [isFocused, setFocus] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchReturnData | null>();
  const [queryLoading, setQueryLoading] = useState<boolean>(false);

  function showResults(): boolean {
    if (!searchResults) return false;
    if (searchResults.error) return false;
    if (!searchResults.results || searchResults.results.length < 1) return false;
    return true;
  }

  useEffect(() => {
    async function getData() {
      setQueryLoading(true);
      const res = await fetch(`/api/search?q=${encodeURI(searchQuery)}`);
      setSearchResults(await res.json());
      setQueryLoading(false);
    }

    getData();
  }, [searchQuery]);

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
            onInput={(e) => setSearchQuery((e.target as HTMLInputElement).value)}
          />
        </div>
        <AnimatePresence>
          {isFocused && (
            <BlurIn
              delay={0}
              childKey="searchbox"
              className="bg-card border-border absolute left-1/2 mt-2 w-fit min-w-72 -translate-x-1/2 overflow-hidden rounded-md border md:min-w-96"
            >
              {queryLoading ? (
                <Loader className="mx-auto my-4 animate-spin" />
              ) : (
                <div className="">
                  {showResults() ? (
                    searchResults?.results?.map((r) => (
                      <Link
                        href={`/item/${r.id}`}
                        className="hover:bg-accent flex h-16 w-full cursor-pointer items-center gap-2 px-2 py-1"
                        key={r.id}
                      >
                        <div className="border-border relative aspect-square h-[91%] rounded-lg border object-cover">
                          <Image fill src={r.images[0]} alt={r.name} />
                        </div>
                        <div className="text-xs">
                          <p>{r.name}</p>
                          <em className="text-muted-foreground">{r.id}</em>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <h1 className="text-muted-foreground p-8 text-center">No results found.</h1>
                  )}
                </div>
              )}
            </BlurIn>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
