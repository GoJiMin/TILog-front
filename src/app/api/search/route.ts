import { searchUsers } from "@/app/services/user";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);
  const userid = session?.user.id || undefined;

  return searchUsers(undefined, userid).then((data) => NextResponse.json(data));
}
