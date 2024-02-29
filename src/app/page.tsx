import PostList from "./components/PostList";
import SideBar from "./components/SideBar";
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
    <main className='flex w-full max-w-[850px] p-4 mx-auto'>
      <section className='w-full basis-4/5'>
        <PostList />
      </section>
      <section className='basis-1/5'>
        <SideBar user={user} />
      </section>
    </main>
  );
}
