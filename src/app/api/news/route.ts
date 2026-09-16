import { NextResponse } from "next/server";
import { getNews } from "@/lib/data/news";

export async function GET() {
  return NextResponse.json(getNews());
}
