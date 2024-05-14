import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import NewPost from "../components/NewPost";

export default async function NewPage() {
  const session = await getServerSession(authOptions);
  const user = session!.user;

  return (
    <section>
      <NewPost user={user} />
    </section>
  );
}
