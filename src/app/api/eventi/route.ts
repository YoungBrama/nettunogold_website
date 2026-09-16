import { NextResponse } from "next/server";
import { getEvents } from "@/lib/data/events";

// Espone gli stessi contenuti di content/eventi/ in JSON, per il consumo
// dall'app mobile (vedi SCHEMA_INTEGRATION.md). Nessuna cache: rispecchia
// il comportamento del sito, che rilegge i file ad ogni richiesta.
export async function GET() {
  return NextResponse.json(getEvents());
}
