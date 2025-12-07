import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const prompts = await prisma.prompt.findMany({
    orderBy: { updatedAt: "desc" },
  });
  return NextResponse.json(prompts);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { title, content, tags } = body;
  const created = await prisma.prompt.create({
    data: { title, content, tags },
  });
  return NextResponse.json(created);
}

export async function PUT(req: Request) {
  const body = await req.json();
  const { id, title, content, tags } = body;
  const updated = await prisma.prompt.update({
    where: { id },
    data: { title, content, tags },
  });
  return NextResponse.json(updated);
}

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  await prisma.prompt.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
