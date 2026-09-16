import { NextResponse } from "next/server";
import { getRankings } from "@/lib/data/rankings";

export async function GET() {
  return NextResponse.json(getRankings());
}
