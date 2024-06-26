import { authOptions } from "@/app/lib/auth";
import { addComment } from "@/app/services/posts";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session!.user;

  const { id, comment, createdAt } = await req.json();

  if (!id || comment === undefined) {
    return new Response("Bad Request!", { status: 400 });
  }

  return addComment(id, comment, createdAt, user.id)
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}
