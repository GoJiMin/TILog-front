import {
  getLikedPostsOf,
  getPostsOf,
  getSavedPostsOf,
} from "@/app/services/posts";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: { slug: string[] };
};

export async function GET(_: NextRequest, context: Context) {
  const { slug } = context.params;

  if (!slug || !Array.isArray(slug) || slug.length < 2) {
    return NextResponse.json("Bad Request", { status: 400 });
  }

  const [id, query] = slug;

  let request = getPostsOf;
  if (query === "saved") {
    request = getSavedPostsOf;
  } else if (query === "liked") {
    request = getLikedPostsOf;
  }

  return request(id).then((data) => NextResponse.json(data));
}
