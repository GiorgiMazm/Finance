import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(
  _: NextRequest,
  { params }: { params: { month: string } },
) {
  const { month } = params;

  // Validate the month parameter
  const monthIndex = parseInt(month, 10);
  if (isNaN(monthIndex) || monthIndex < 1 || monthIndex > 12) {
    return NextResponse.json(
      { error: "Invalid month parameter" },
      { status: 400 },
    );
  }

  try {
    // Use parameterized queries to prevent SQL injection
    const query = `SELECT * FROM spending WHERE user_id = $1 AND EXTRACT(YEAR FROM date) = $2 AND EXTRACT(MONTH FROM date) = $3;`;
    const { rows } = await pool.query(query, [1, 2024, monthIndex]);

    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error("Error executing query:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
