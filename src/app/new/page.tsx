import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import { redirect } from "next/navigation";
import NewPost from "../components/NewPost";

export default async function NewPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect("/auth/signin");
  }

  return (
    <section className="flex justify-center items-center h-full">
      <NewPost user={user} />
    </section>
  );
}
