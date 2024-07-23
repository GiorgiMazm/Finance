import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body
    const { subject, date, spent, category } = body;
    if (!subject || !date || !spent || !category) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    // Use parameterized queries to prevent SQL injection
    const query = `INSERT INTO spending (user_id, subject, date, spent, category) VALUES ($1, $2, $3, $4, $5)`;
    await pool.query(query, [1, subject, date, spent, category]);

    return NextResponse.json(
      { message: "Record inserted successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error executing query:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body
    const { id, subject, date, spent, category } = body;
    if (!id || !subject || !date || !spent || !category) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    // Use parameterized queries to prevent SQL injection
    const query = `UPDATE spending SET subject = $1, date = $2, spent = $3, category = $4 WHERE id = $5`;
    const result = await pool.query(query, [
      subject,
      date,
      spent,
      category,
      id,
    ]);

    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: "No record found with the given ID" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Record updated successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error executing query:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
