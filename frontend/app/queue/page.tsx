'use client';
import { useState } from "react";
import axios from "axios";

export default function QueuePage() {
  const [result, setResult] = useState<any>(null);
  async function trigger() {
    const res = await axios.post("/api/proxy/jobs/trigger", {});
    setResult(res.data);
  }
  return (
    <main className="p-8 space-y-4">
      <h2 className="text-xl font-semibold">Queue Monitor</h2>
      <button onClick={trigger} className="border px-4 py-2">Process 10 Jobs</button>
      {result && <pre className="bg-gray-100 p-4">{JSON.stringify(result, null, 2)}</pre>}
    </main>
  );
}

