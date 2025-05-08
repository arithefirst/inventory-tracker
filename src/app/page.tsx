import { ThemeToggle } from '@/components/themeToggle';

export default function Home() {
  return (
    <div className="min-h-screen w-screen">
      <header className="border-b-border flex w-screen items-center border-b p-2">
        <p>
          <span className="mr-1 font-bold">{process.env.NEXT_PUBILC_COMPANYNAME}</span>
          Inventory Manager
        </p>
        <ThemeToggle className="ml-auto" />
      </header>
    </div>
  );
}
