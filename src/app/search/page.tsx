import { getServerSession } from "next-auth";
import SearchUser from "../components/SearchUser";
import { Metadata } from "next";
import { authOptions } from "../lib/auth";

export const metadata: Metadata = {
  title: "사용자 검색",
  description: "키워드를 통해 사용자를 검색하세요!",
};

export default async function SearchPage() {
  const session = await getServerSession(authOptions);
  const user = session!.user;

  return <SearchUser loginUser={user} />;
}
