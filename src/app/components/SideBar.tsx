import { AuthUser } from "../model/user";
import Avatar from "./ui/Avatar";
import UserCard from "./ui/UserCard";

type Props = {
  user: AuthUser;
};

export default function SideBar({ user }: Props) {
  return (
    <section className='px-3'>
      <UserCard user={user} />
    </section>
  );
}
