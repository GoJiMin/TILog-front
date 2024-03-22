import { ProfileUser } from "../model/user";
import ProfileFollowButton from "./ProfileFollowButton";
import Avatar from "./ui/Avatar";

type Props = {
  user: ProfileUser;
};

export default function UserProfile({ user }: Props) {
  const {
    userid,
    name,
    profileimage,
    bookmarks,
    posts,
    followers,
    following,
    id,
    email,
  } = user;
  return (
    <article className='w-full'>
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
      <section className='flex flex-col  mt-3'>
        <ProfileFollowButton user={user} />
      </section>
    </article>
  );
}
