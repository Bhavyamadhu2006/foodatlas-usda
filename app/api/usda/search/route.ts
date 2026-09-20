import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim();
  if (!q) return NextResponse.json({ foods: [] });

  const key = process.env.USDA_API_KEY || "DEMO_KEY";
  const url = new URL("https://api.nal.usda.gov/fdc/v1/foods/search");
  url.searchParams.set("api_key", key);
  url.searchParams.set("query", q);
  url.searchParams.set("pageSize", "20");

  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) return NextResponse.json({ error: "USDA request failed" }, { status: response.status });

  const data = await response.json();
  return NextResponse.json({ foods: data.foods || [] });
}
