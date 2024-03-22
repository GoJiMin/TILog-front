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
    <section className='flex justify-center mt-10'>
      <UserProfile user={user} />
      <UserPosts user={user} />
    </section>
  );
}
