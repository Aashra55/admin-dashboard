import { NextResponse } from "next/server";
import client from "../../../lib/sanity";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json();
  try {
    const updatedProduct = await client.patch(params.id).set(data).commit();
    return NextResponse.json(updatedProduct);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await client.delete(params.id);
    return NextResponse.json({ message: "Product deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
