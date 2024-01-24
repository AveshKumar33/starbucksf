import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";

const GET = withApiAuthRequired(async () => {
  const session = await getSession();
  if (session && session.accessToken) {
    return NextResponse.json({ token: session.idToken });
  }
  return NextResponse.json({ status: 400 });
});

export { GET };
