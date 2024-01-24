import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";

const GET = withApiAuthRequired(async (req: NextRequest) => {
  const accessToken = req.nextUrl.searchParams.get("acessToken");
  const userId = req.nextUrl.searchParams.get("userId");

  const result = await fetch(
    `${process.env.NEXT_PUBLIC_MANAGEMENT_API_URL}/api/v2/users/${userId}`,
    {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    },
  );
  const data = await result.json();
  const userInfo = {
    name: data.name,
    email: data.email,
    phone_number: data.user_metadata.phone_number,
    profile_picture: data.user_metadata.profile_picture,
  };

  return NextResponse.json({ userInfo: userInfo }, { status: data.statusCode });
});

const PATCH = withApiAuthRequired(async (req: NextRequest) => {
  const { profile_picture, accessToken, userId } = await req.json();
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_MANAGEMENT_API_URL}/api/v2/users/${userId}`,
    {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_metadata: {
          profile_picture,
        },
      }),
    },
  );
  const data = await result.json();
  return NextResponse.json({ message: data.message }, { status: data.statusCode });
});

export { GET, PATCH };
