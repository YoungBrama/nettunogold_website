import { NextResponse } from "next/server";
import { getAllSeries } from "@/lib/data/series";

export async function GET() {
  return NextResponse.json(getAllSeries());
}
