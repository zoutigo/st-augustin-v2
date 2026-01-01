import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(
  _req: Request,
  { params }: { params: { pageId: string } },
) {
  try {
    const { pageId } = params;
    if (!pageId) {
      return NextResponse.json({ error: "Missing page id" }, { status: 400 });
    }

    await db.page.delete({ where: { id: pageId } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete page", error);
    return NextResponse.json(
      { error: "Failed to delete page" },
      { status: 500 },
    );
  }
}
