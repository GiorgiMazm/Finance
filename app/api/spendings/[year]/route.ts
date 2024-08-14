import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { Spent } from "@/types/Spent";

export async function GET(
  _: NextRequest,
  { params }: { params: { year: string } },
) {
  const { year } = params;
  try {
    // Use parameterized queries to prevent SQL injection
    const query = `SELECT * FROM spending WHERE user_id = $1 AND EXTRACT(YEAR FROM date) = $2;`;
    const { rows } = await pool.query(query, [1, year]);

    rows.forEach((spent: Spent) => {
      const date = new Date(spent.date);

      // Get the date part only
      const year = date.getFullYear();
      const month1 = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      // Format as "YYYY-MM-DD"
      const formattedDate = `${year}-${month1}-${day}`;

      spent.date = formattedDate;
    });
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error("Error executing query:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
