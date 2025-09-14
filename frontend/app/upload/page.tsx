'use client';

import { useState } from "react";
import axios from "axios";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [tenant, setTenant] = useState("");
  const [partner, setPartner] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  async function submit() {
    if (!file || !tenant) return;
    const buf = await file.arrayBuffer();
    const base64 = Buffer.from(buf).toString("base64");
    const res = await axios.post("/api/proxy/ingest/upload", {
      tenant_id: tenant,
      partner_id: partner || undefined,
      filename: file.name,
      mime_type: file.type || "application/octet-stream",
      bytes: file.size,
      content_base64: base64
    });
    setStatus(JSON.stringify(res.data));
  }

  return (
    <main className="p-8 space-y-4">
      <h2 className="text-xl font-semibold">Upload File</h2>
      <input placeholder="tenant uuid" value={tenant} onChange={e=>setTenant(e.target.value)} className="border p-2 w-full max-w-md" />
      <input placeholder="partner uuid (optional)" value={partner} onChange={e=>setPartner(e.target.value)} className="border p-2 w-full max-w-md" />
      <input type="file" onChange={e=>setFile(e.target.files?.[0] ?? null)} />
      <button onClick={submit} className="border px-4 py-2">Submit</button>
      {status && <pre className="bg-gray-100 p-4">{status}</pre>}
    </main>
  );
}

