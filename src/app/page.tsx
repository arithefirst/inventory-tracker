export default function Home() {
  return <div className="min-h-screen w-screen">
    <header className="w-screen p-2 border-b border-b-border">
      <span className="font-bold mr-1">{process.env.NEXT_PUBILC_COMPANYNAME}</span>
      Inventory Manager
    </header>
  </div>;
}
