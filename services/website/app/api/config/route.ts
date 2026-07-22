import { NextResponse } from "next/server";

// Runtime config endpoint — avoids baking NEXT_PUBLIC_* values in at build
// time, since the bff-service URL/port is only known once containers start.
export async function GET() {
  return NextResponse.json({
    bffUrl: process.env.BFF_URL || "http://localhost:8080",
  });
}
