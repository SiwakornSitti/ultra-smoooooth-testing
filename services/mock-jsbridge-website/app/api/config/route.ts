import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    bffUrl: process.env.BFF_URL || "http://localhost:8080",
  });
}
