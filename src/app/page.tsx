import PostList from "./components/PostList";
import SideBar from "./components/SideBar";
import FollowingList from "./components/FollowingList";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect("/auth/signin");
  }

  return (
    <main className='flex justify-center relative'>
      <section className='w-full'>
        <PostList />
      </section>
      <section className='absolute right-0 w-[250px]'>
        <SideBar user={user} />
        <FollowingList />
      </section>
    </main>
  );
}
