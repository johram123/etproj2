import { getAccessToken } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const res = new NextResponse();
  try {
    const { accessToken } = await getAccessToken(req, res);
    if (!accessToken) {
      return NextResponse.json({ error: "No access token" }, { status: 401 });
    }
    return NextResponse.json({
      message: "Protected demo ok",
      hasToken: true,
      endpoint: "/api/protected-demo",
      timestamp: new Date().toISOString(),
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Unauthorized" },
      { status: 401 }
    );
  }
}
