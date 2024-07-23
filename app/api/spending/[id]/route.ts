import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  // Validate the ID parameter
  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    // Use parameterized queries to prevent SQL injection
    const query = "DELETE FROM spending WHERE id = $1";
    const result = await pool.query(query, [id]);

    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: "No record found with the given ID" },
        { status: 404 },
      );
    }

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.error("Error executing query:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
