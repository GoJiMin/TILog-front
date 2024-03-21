import { AuthUser } from "@/app/model/user";
import Avatar from "./Avatar";
import Link from "next/link";

export default function UserCard({
  user: { name, userid, profileimage },
  connections,
}: {
  user: AuthUser;
  connections?: {
    following: number;
    followers: number;
  };
}) {
  return (
    <Link href={`/user/${userid}`} className='flex itmes-center gap-[12px]'>
      <Avatar image={profileimage} size={"small"} />
      <section className=''>
        <div className='-translate-y-0.5'>
          <p className='font-semibold'>{userid}</p>
          <p className='text-sm text-neutral-500'>{name}</p>
        </div>
        {connections && (
          <p className='mt-1'>
            {`${connections.following} 팔로잉 ${connections.followers} 팔로워`}{" "}
          </p>
        )}
      </section>
    </Link>
  );
}
