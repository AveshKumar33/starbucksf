import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";

const PATCH = withApiAuthRequired(async (req: NextRequest) => {
  const { password, accessToken, userId } = await req.json();
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_MANAGEMENT_API_URL}/api/v2/users/${userId}`,
    {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        connection: "Username-Password-Authentication",
      }),
    },
  );
  const data = await result.json();
  return NextResponse.json({ message: data.message }, { status: data.statusCode });
});

export { PATCH };
