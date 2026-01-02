import { NextResponse } from "next/server";
import {
  createFaqCategory,
  getAllFaqCategories,
} from "@/actions/faq/categories";

export async function GET() {
  const data = await getAllFaqCategories();
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();
  const result = await createFaqCategory(body);
  const status = "error" in result ? 400 : 200;
  return NextResponse.json(result, { status });
}
