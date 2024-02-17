import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Guide } from "@/types/api";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const requestData = Guide.updateStatus.safeParse(body);

  if (!requestData.success) {
    return NextResponse.json({ error: "Invalid Request" }, { status: 400 });
  }
  const { data } = requestData;
  const response = NextResponse.json({ data }, { status: 200 });
  response.cookies.set({ name: "guide-status", value: data.status });

  return response;
}
