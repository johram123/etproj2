import { getAccessToken } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";

// Ensure audience & scopes match API configuration
const AUDIENCE = process.env.AUTH0_AUDIENCE;
const SCOPES = "openid profile email"; // add custom API scopes here if needed

export async function GET(req: NextRequest) {
  try {
    const res = new NextResponse();
    const { accessToken } = await getAccessToken(req, res, {
      scopes: SCOPES.split(" "),
      ...(AUDIENCE ? { audience: AUDIENCE } : {}),
    });

    if (!accessToken) {
      return NextResponse.json(
        { error: "No access token available" },
        { status: 401 }
      );
    }

    // Decode JWT (if it looks like one) for debugging audience issues
    let decoded: any = null;
    if (accessToken.split(".").length === 3) {
      try {
        const [h, p] = accessToken.split(".");
        const b64 = (s: string) =>
          Buffer.from(
            s.replace(/-/g, "+").replace(/_/g, "/"),
            "base64"
          ).toString("utf8");
        decoded = { header: JSON.parse(b64(h)), payload: JSON.parse(b64(p)) };
      } catch (e) {
        decoded = { error: "Failed to decode JWT" };
      }
    } else {
      decoded = {
        note: "Access token is opaque (no audience). You likely did not configure an API / audience in Auth0.",
      };
    }

    return NextResponse.json({
      accessToken,
      audienceRequested: AUDIENCE,
      scopesRequested: SCOPES,
      decoded,
      message: "Access token retrieved successfully",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error getting access token:", error);
    return NextResponse.json(
      { error: "Failed to get access token" },
      { status: 500 }
    );
  }
}
