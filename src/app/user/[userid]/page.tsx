import UserPosts from "@/app/components/UserPosts";
import UserProfile from "@/app/components/UserProfile";
import { getUserForProfile } from "@/app/services/user";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

type Props = {
  params: { userid: string };
};

const getUser = cache(async (userid: string) => getUserForProfile(userid));

export default async function UserPage({ params: { userid } }: Props) {
  const user = await getUser(userid);

  if (!user) {
    notFound();
  }
  return (
    <section className='w-full mx-auto max-w-2xl mt-10'>
      <UserProfile user={user} />
      <UserPosts user={user} />
    </section>
  );
}

export async function generateMetadata({
  params: { userid },
}: Props): Promise<Metadata> {
  const user = await getUser(userid);

  return {
    title: `${user?.name}님(@${user?.userid})의 프로필`,
    description: `${user?.name}님의 게시물을 확인해보세요!`,
  };
}
