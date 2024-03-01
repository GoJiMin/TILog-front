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
    <main className='flex w-full p-4 px-8 mx-auto'>
      <section className='w-full basis-4/5'>
        <PostList />
      </section>
      <section className='basis-1/5'>
        <SideBar user={user} />
        <FollowingList />
      </section>
    </main>
  );
}
