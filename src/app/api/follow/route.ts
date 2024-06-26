import { authOptions } from "@/app/lib/auth";
import { follow, unFollow } from "@/app/services/user";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session!.user;

  const { id: targetId, follow: isFollow } = await req.json();

  if (!targetId || follow === undefined) {
    return new Response("Bad Request", { status: 400 });
  }

  const request = isFollow ? follow : unFollow;

  return request(user.id, targetId)
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}
