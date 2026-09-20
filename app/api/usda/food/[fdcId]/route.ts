import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(_: Request, { params }: { params: Promise<{ fdcId: string }> }) {
  const { fdcId } = await params;
  const key = process.env.USDA_API_KEY || "DEMO_KEY";
  const url = `https://api.nal.usda.gov/fdc/v1/food/${encodeURIComponent(fdcId)}?api_key=${encodeURIComponent(key)}`;
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) return NextResponse.json({ error: "USDA request failed" }, { status: response.status });
  return NextResponse.json(await response.json());
}
