import { NextResponse } from "next/server";
import { createFaq, getAllFaqs } from "@/actions/faq/faqs";

export async function GET() {
  const data = await getAllFaqs();
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();
  const result = await createFaq(body);
  const status = "error" in result ? 400 : 200;
  return NextResponse.json(result, { status });
}
