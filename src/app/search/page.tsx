import { getServerSession } from "next-auth";
import SearchUser from "../components/SearchUser";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function SearchPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user || null;
  return (
    <section>
      <SearchUser loginUser={user} />
    </section>
  );
}
