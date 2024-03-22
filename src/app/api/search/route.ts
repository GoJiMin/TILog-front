import { authOptions } from "@/app/lib/auth";
import { searchUsers } from "@/app/services/user";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  const userid = session?.user.id || undefined;

  return searchUsers(undefined, userid).then((data) => NextResponse.json(data));
}
