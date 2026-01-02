import { NextResponse } from "next/server";
import { deleteFaqCategory, updateFaqCategory } from "@/actions/faq/categories";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  const body = await req.json();
  const result = await updateFaqCategory(params.id, body);
  const status = "error" in result ? 400 : 200;
  return NextResponse.json(result, { status });
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const result = await deleteFaqCategory(params.id);
  const status = "error" in result ? 400 : 200;
  return NextResponse.json(result, { status });
}
