import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? undefined;
  const take = Number(searchParams.get("take") ?? 12);
  const skip = Number(searchParams.get("skip") ?? 0);

  const where = q
    ? { OR: [{ title: { contains: q, mode: "insensitive" } }, { description: { contains: q, mode: "insensitive" } }] }
    : undefined;

  const [items, total] = await Promise.all([
    prisma.prompt.findMany({
      where,
      take,
      skip,
      orderBy: { createdAt: "desc" },
      include: {
        author: { select: { id: true, name: true, image: true } },
        category: { select: { id: true, name: true, slug: true } },
      },
    }),
    prisma.prompt.count({ where }),
  ]);

  return NextResponse.json({ items, total });
}

export async function POST(request: Request) {
  // Note: add auth + validation later
  const body = await request.json();
  const created = await prisma.prompt.create({ data: body });
  return NextResponse.json(created, { status: 201 });
}


