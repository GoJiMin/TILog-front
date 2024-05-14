import { getServerSession } from "next-auth";
import { createPost, getFollowingPosts } from "@/app/services/posts";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return Response.json({ message: "Authentication Error" }, { status: 401 });
  }

  return getFollowingPosts(user.id).then((data) => NextResponse.json(data));
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return Response.json({ message: "Authentication Error" }, { status: 401 });
  }

  const form = await req.formData();

  const text = form.get("text")?.toString();
  const file = form.get("file") as Blob;

  if (!text || !file) {
    return Response.json({ message: "Bad Request" }, { status: 400 });
  }

  return createPost(user.id, text, file).then((data) =>
    NextResponse.json(data)
  );
}
