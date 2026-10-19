import { NextResponse } from "next/server";
import { getPublicBusinessBySlug } from "@/lib/public-business";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const business = await getPublicBusinessBySlug(slug);

  if (!business) {
    return NextResponse.json({ error: "Business not found" }, { status: 404 });
  }

  return NextResponse.json(business);
}
