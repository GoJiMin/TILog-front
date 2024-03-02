"use client";

import useSWR from "swr";
import { DetailUser } from "../model/user";
import { ScaleLoader } from "react-spinners";
import Link from "next/link";
import UserCard from "./ui/UserCard";

export default function FollowingList() {
  const {
    data,
    isLoading: loading,
    error,
  } = useSWR<DetailUser>("/api/profile");
  const users = data?.following.slice(0, 5);

  return (
    <section className='mt-6 shadow-lg p-3 rounded-lg'>
      <div className='flex justify-between font-semibold'>
        <p className='text-neutral-500'>회원님의 팔로잉</p>
        {users && users.length > 0 && <p className='text-sm'>모두 보기</p>}
      </div>
      {loading ? (
        <ScaleLoader
          className='text-center mt-[110px] mb-[130px]'
          color='#000000'
          height={35}
          margin={2}
          radius={10}
          width={6}
        />
      ) : (
        (!users || users.length === 0) && (
          <p className='mt-2 text-sm font-semibold text-neutral-500'>
            현재 팔로잉 중인 사람이 없어요!
          </p>
        )
      )}
      {users && users.length > 0 && (
        <article className='mt-4'>
          <ul className='flex flex-col gap-[20px]'>
            {users.map(({ userid, name, profileimage }) => (
              <li key={userid}>
                <Link href={`/user/${userid}`}>
                  <UserCard user={{ userid, name, profileimage }} />
                </Link>
              </li>
            ))}
          </ul>
        </article>
      )}
    </section>
  );
}
