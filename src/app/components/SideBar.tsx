import { AuthUser } from "../model/user";
import Avatar from "./ui/Avatar";

type Props = {
  user: AuthUser;
};

export default function SideBar({
  user: { userid, name, profileimage },
}: Props) {
  return (
    <section className='px-3'>
      <article className='flex items-center gap-[10px]'>
        <Avatar image={profileimage} size={"small"} />
        <div>
          <p className='font-semibold'>{userid}</p>
          <p className='text-sm text-neutral-500 leading-4'>{name}</p>
        </div>
      </article>
    </section>
  );
}
