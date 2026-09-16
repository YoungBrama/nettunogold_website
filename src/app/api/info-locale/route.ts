import { NextResponse } from "next/server";
import { businessInfo } from "@/lib/site-config";

// Dati societari/di contatto, usati dalla pagina Contatti e dall'app mobile.
export async function GET() {
  return NextResponse.json(businessInfo);
}
