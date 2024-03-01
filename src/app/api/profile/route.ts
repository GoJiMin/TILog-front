import { getUserById } from "@/app/services/user";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return Response.json({ message: "Authentication Error" }, { status: 401 });
  }

  return getUserById(user.id).then((data) => NextResponse.json(data));
}
