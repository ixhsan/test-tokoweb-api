import { NextRequest, NextResponse } from "next/server";
import api from "@/utils/api";

export async function GET() {
  const res = await api.get("/product");

  // const data = [
  //   {
  //     id: 46,
  //     name: "Edit Produk testing",
  //     price: 5465,
  //     image: null,
  //     created_at: "2023-05-18T05:01:04.000000Z",
  //     updated_at: "2023-05-18T05:01:26.000000Z",
  //     image_url: null,
  //   },
  //   {
  //     id: 48,
  //     name: "hahha",
  //     price: 100000,
  //     image: null,
  //     created_at: "2023-05-19T02:06:06.000000Z",
  //     updated_at: "2023-05-19T02:06:06.000000Z",
  //     image_url: null,
  //   },
  //   {
  //     id: 43,
  //     name: "Jaket Hoodie",
  //     price: 150000,
  //     image: null,
  //     created_at: "2023-01-28T13:11:27.000000Z",
  //     updated_at: "2023-01-28T13:11:27.000000Z",
  //     image_url: null,
  //   },
  //   {
  //     id: 42,
  //     name: "Mechanical Keyboard",
  //     price: 350000,
  //     image: null,
  //     created_at: "2023-01-28T12:35:28.000000Z",
  //     updated_at: "2023-01-28T12:35:28.000000Z",
  //     image_url: null,
  //   },
  //   {
  //     id: 39,
  //     name: "Meja Lipat",
  //     price: 350000,
  //     image: null,
  //     created_at: "2023-01-28T10:24:49.000000Z",
  //     updated_at: "2023-01-28T10:24:49.000000Z",
  //     image_url: null,
  //   },
  // ];

  return NextResponse.json(res.data.data);
  // return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();
  const res = await api.post(`/product/store`, {
    ...body,
  });

  return NextResponse.json(res.data);
}
