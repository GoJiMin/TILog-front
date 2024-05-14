import { authOptions } from "@/app/lib/auth";
import { getUserById } from "@/app/services/user";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  const user = session!.user;

  return getUserById(user.id).then((data) => NextResponse.json(data));
}
