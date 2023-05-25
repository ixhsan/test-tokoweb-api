import api from "@/utils/api";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const res = await api.get(`/product/show?product_id=${id}`);

  return NextResponse.json(res.data.data);
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const id = params.id;

  const res = await api.post(`/product/update`, {
    ...body,
    product_id: id,
  });

  return NextResponse.json(res.data);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const res = await api.delete(`/product/${id}`);

  return NextResponse.json({ status: res.status });
}
