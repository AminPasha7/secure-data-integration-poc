import Link from "next/link";

export default function Home() {
  return (
    <main className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Secure Data Integration – Admin</h1>
      <ul className="list-disc pl-6">
        <li><Link href="/upload">Upload</Link></li>
        <li><Link href="/queue">Queue Monitor</Link></li>
        <li><Link href="/partners">Partners</Link></li>
      </ul>
    </main>
  );
}
