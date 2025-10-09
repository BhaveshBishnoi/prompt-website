import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

type RouteContext = { params: { id: string } };

export async function GET(_req: Request, { params }: RouteContext) {
  const item = await prisma.prompt.findUnique({ where: { id: params.id } });
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(item);
}

export async function PUT(request: Request, { params }: RouteContext) {
  const body = await request.json();
  const updated = await prisma.prompt.update({ where: { id: params.id }, data: body });
  return NextResponse.json(updated);
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  await prisma.prompt.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}


