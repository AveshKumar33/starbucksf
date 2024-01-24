import { NextResponse } from "next/server";

export const POST = () => {
  const response = NextResponse.json({
    status: 200,
  });
  return response;
};
