import { NextResponse } from "next/server";
import client from "../../lib/sanity";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const newProduct = {
      _type: "new_product",
      name: data.name,
      price: data.price,
      description: data.description,
      image: data.image,
    };

    const response = await client.create(newProduct);
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error: "Failed to add product" }, { status: 500 });
  }
}
