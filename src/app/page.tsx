import { ThemeToggle } from "@/components/themeToggle";

export default function Home() {
  return <div className="min-h-screen w-screen">
    <header className="w-screen p-2 border-b border-b-border flex items-center">
      <p>
      <span className="font-bold mr-1">{process.env.NEXT_PUBILC_COMPANYNAME}</span>
      Inventory Manager
      </p>
      <ThemeToggle className="ml-auto"/>
    </header>
  </div>;
}
