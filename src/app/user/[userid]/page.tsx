import UserPosts from "@/app/components/UserPosts";
import UserProfile from "@/app/components/UserProfile";
import { getUserForProfile } from "@/app/services/user";
import { notFound } from "next/navigation";

type Props = {
  params: { userid: string };
};

export default async function Page({ params }: Props) {
  const user = await getUserForProfile(params.userid);

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
