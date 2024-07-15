import spendingData2 from "@/spendingData.json";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { month: string } },
) {
  const { month } = params;

  const monthIndex = parseInt(month, 10);
  if (!isNaN(monthIndex) && monthIndex >= 1 && monthIndex <= 12) {
    return NextResponse.json(spendingData2.month[monthIndex - 1]);
  } else {
    return NextResponse.json(
      { error: "Invalid month parameter" },
      { status: 400 },
    );
  }
}
