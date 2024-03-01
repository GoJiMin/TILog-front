import { User } from "@/app/model/user";
import Avatar from "./Avatar";

export default function UserCard({
  user: { name, userid, email, profileimage },
}: {
  user: User;
}) {
  return (
    <article className='flex items-center gap-[10px]'>
      <Avatar image={""} size={"small"} />
      <div>
        <p className='font-semibold'>{userid}</p>
        <p className='text-sm text-neutral-500 leading-4'>{name}</p>
      </div>
    </article>
  );
}
