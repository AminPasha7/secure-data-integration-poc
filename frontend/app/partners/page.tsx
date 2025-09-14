'use client';
import { useState } from "react";
import axios from "axios";

export default function PartnersPage() {
  const [tenant, setTenant] = useState("");
  const [name, setName] = useState("");
  const [config, setConfig] = useState("{}");
  const [resp, setResp] = useState<string| null>(null);

  async function save() {
    const res = await axios.post("/api/proxy/partners", {
      tenant_id: tenant,
      name,
      config: JSON.parse(config)
    });
    setResp(JSON.stringify(res.data, null, 2));
  }

  return (
    <main className="p-8 space-y-4">
      <h2 className="text-xl font-semibold">Partners</h2>
      <input placeholder="tenant uuid" value={tenant} onChange={e=>setTenant(e.target.value)} className="border p-2 w-full max-w-md" />
      <input placeholder="partner name" value={name} onChange={e=>setName(e.target.value)} className="border p-2 w-full max-w-md" />
      <textarea value={config} onChange={e=>setConfig(e.target.value)} className="border p-2 w-full max-w-xl h-40" />
      <button onClick={save} className="border px-4 py-2">Save</button>
      {resp && <pre className="bg-gray-100 p-4">{resp}</pre>}
    </main>
  );
}

