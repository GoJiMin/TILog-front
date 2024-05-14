import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { Post } from "@/app/model/post";
import { getPost } from "@/app/services/posts";
import { authOptions } from "@/app/lib/auth";

type Context = {
  params: { id: string };
};

export async function GET(_: NextRequest, context: Context) {
  return getPost(context.params.id).then((data: Post) =>
    NextResponse.json(data)
  );
}
