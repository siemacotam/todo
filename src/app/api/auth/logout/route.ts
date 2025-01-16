import { NextResponse } from "next/server";

export async function GET() {
  const data = { message: "Logged out" };
  return NextResponse.json(data);
}
