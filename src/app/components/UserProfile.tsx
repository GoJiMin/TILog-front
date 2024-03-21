import { ProfileUser } from "../model/user";
import Avatar from "./ui/Avatar";

type Props = {
  user: ProfileUser;
};

export default function UserProfile({
  user: {
    userid,
    name,
    profileimage,
    bookmarks,
    posts,
    followers,
    following,
    id,
    email,
  },
}: Props) {
  return (
    <article className='w-full max-w-2xl'>
      <section className='flex justify-between'>
        <div>
          <p className='text-3xl font-semibold'>{name}</p>
          <p className='text-2xl text-neutral-500'>{userid}</p>
          <div className='flex gap-[15px] mt-4 text-lg'>
            <p>{posts} 게시물</p>
            <p>{following} 팔로잉</p>
            <p>{followers} 팔로워</p>
          </div>
        </div>
        <Avatar image={profileimage} />
      </section>
      <section className='flex flex-col text-xl mt-3'>
        <button className='bg-black rounded-lg py-1.5 text-white font-semibold'>
          팔로우
        </button>
      </section>
    </article>
  );
}
