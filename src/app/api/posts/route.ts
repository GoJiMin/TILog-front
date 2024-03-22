import { getServerSession } from "next-auth";
import { getFollowingPosts } from "@/app/services/posts";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return Response.json({ message: "Authentication Error" }, { status: 401 });
  }

  return getFollowingPosts(user.id).then((data) => NextResponse.json(data));
}
