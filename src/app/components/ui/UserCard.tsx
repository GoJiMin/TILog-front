import { User } from "@/app/model/user";
import Avatar from "./Avatar";

export default function UserCard({
  user: { name, userid, profileimage },
}: {
  user: User;
}) {
  return (
    <article className='flex items-center gap-[10px]'>
      <Avatar image={profileimage} size={"small"} />
      <div className='-translate-y-0.5'>
        <p className='font-semibold'>{userid}</p>
        <p className='text-sm text-neutral-500 leading-3'>{name}</p>
      </div>
    </article>
  );
}
