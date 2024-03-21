import { searchUsers } from "@/app/services/user";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

type Context = {
  params: { keyword: string };
};

export async function GET(_: NextRequest, context: Context) {
  const session = await getServerSession(authOptions);
  const userid = session?.user.id || undefined;

  return searchUsers(context.params.keyword, userid).then((data) =>
    NextResponse.json(data)
  );
}
