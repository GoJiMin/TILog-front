import { User } from "../model/user";
import Avatar from "./Avatar";

type Props = {
  user: User;
};

export default function SideBar({ user: { userid, name, image } }: Props) {
  return (
    <section>
      <article className='flex items-center gap-[10px]'>
        <Avatar image={image} size={"small"} />
        <div>
          <p className='font-semibold'>{userid}</p>
          <p className='text-sm text-neutral-500 leading-4'>{name}</p>
        </div>
      </article>
    </section>
  );
}
