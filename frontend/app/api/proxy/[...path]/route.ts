import { NextRequest } from "next/server";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:9400";

async function forward(req: NextRequest, path: string[], method: string) {
  const url = `${API_BASE}/${path.join("/")}${req.nextUrl.search}`;
  const init: RequestInit = {
    method,
    headers: { "content-type": req.headers.get("content-type") || "application/json" },
    body: ["GET","HEAD"].includes(method) ? undefined : await req.text(),
  };
  const res = await fetch(url, init);
  const buf = Buffer.from(await res.arrayBuffer());
  return new Response(buf, { status: res.status, headers: { "content-type": res.headers.get("content-type") || "application/json" } });
}

export async function GET(req: NextRequest, { params }: { params: { path: string[] } }) { return forward(req, params.path, "GET"); }
export async function POST(req: NextRequest, { params }: { params: { path: string[] } }) { return forward(req, params.path, "POST"); }
export async function PUT(req: NextRequest, { params }: { params: { path: string[] } }) { return forward(req, params.path, "PUT"); }
export async function DELETE(req: NextRequest, { params }: { params: { path: string[] } }) { return forward(req, params.path, "DELETE"); }
