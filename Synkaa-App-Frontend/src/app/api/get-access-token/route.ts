import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";

const POST = withApiAuthRequired(async () => {
  const result = await fetch(`${process.env.NEXT_PUBLIC_MANAGEMENT_API_URL}/oauth/token`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      client_id: process.env.NEXT_PUBLIC_MANAGEMENT_API_CLIENT_ID,
      client_secret: process.env.NEXT_PUBLIC_MANAGEMENT_API_CLIENT_SECRET,
      audience: process.env.NEXT_PUBLIC_MANAGEMENT_API_AUDIENCE,
      grant_type: process.env.NEXT_PUBLIC_MANAGEMENT_API_GRANT_TYPE,
    }),
  });
  if (result.status === 200 || result.status === 201) {
    const accessToken = await result.json();
    return NextResponse.json({ accessToken: accessToken.access_token }, { status: 200 });
  } else {
    return NextResponse.json({ status: 500 });
  }
});

export { POST };
