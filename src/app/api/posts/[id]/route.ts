import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import { Post } from "@/app/model/post";
import { getPost } from "@/app/services/posts";

type Context = {
  params: { id: string };
};

export async function GET(request: NextRequest, context: Context) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return Response.json({ message: "Authentication Error" }, { status: 401 });
  }

  return getPost(context.params.id).then((data: Post) =>
    NextResponse.json(data)
  );
}
