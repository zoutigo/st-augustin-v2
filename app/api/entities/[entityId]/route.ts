import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(
  _req: Request,
  { params }: { params: { entityId: string } },
) {
  try {
    const { entityId } = params;
    if (!entityId) {
      return NextResponse.json({ error: "Missing entity id" }, { status: 400 });
    }

    await db.entity.delete({ where: { id: entityId } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete entity", error);
    return NextResponse.json(
      { error: "Failed to delete entity" },
      { status: 500 },
    );
  }
}
