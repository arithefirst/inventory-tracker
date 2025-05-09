import { Loader } from 'lucide-react';
import { ThemeToggle } from '@/components/themeToggle';

export default function Loading() {
  return (
    <div className="flex min-h-screen w-screen flex-col">
      <header className="border-b-border flex w-screen items-center border-b px-4 py-2">
        <p>
          <span className="mr-1 font-bold">{process.env.NEXT_PUBILC_COMPANYNAME}</span>
          Inventory Manager
        </p>
        <ThemeToggle className="ml-auto" />
      </header>
      <main className="flex flex-1 items-center justify-center">
        <Loader className="animate-spin" size={24} />
      </main>
    </div>
  );
}
