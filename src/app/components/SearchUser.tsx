"use client";

import { FormEvent, useState } from "react";
import useSWR from "swr";
import { SearchIcon } from "./ui/icons";
import UserCard from "./ui/UserCard";
import { SimpleUser } from "../model/user";
import MoonSpinner from "./ui/MoonSpinner";

export default function SearchUser() {
  const [keyword, setKeyword] = useState("");
  const {
    data: users,
    isLoading: loading,
    error,
  } = useSWR<SimpleUser[]>(`/api/search/${keyword}`);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className='w-full max-w-xl mx-auto'>
      <form
        className='border border-neutral-300 bg-neutral-50 focus-within:drop-shadow-xl rounded-lg mt-[20px] mb-[30px]'
        onSubmit={handleSubmit}
      >
        <label className='flex gap-[5px] p-5' htmlFor='search'>
          <p className='text-neutral-300'>
            <SearchIcon size={"small"} />
          </p>
          <input
            id='search'
            value={keyword}
            onChange={handleChange}
            autoFocus
            autoComplete='off'
            className='border-none outline-none bg-transparent text-lg ml-2'
            type='text'
            placeholder='사용자를 검색해보세요!'
          />
        </label>
      </form>
      {error && (
        <p className='text-xl text-center'>검색 과정에 문제가 발생했어요.</p>
      )}
      {loading && <MoonSpinner />}
      {!loading && !error && users?.length === 0 && (
        <p className='text-xl text-center'>검색된 사용자가 없어요.</p>
      )}
      <ul className='flex flex-col gap-[15px]'>
        {users &&
          users.map((user, index) => (
            <li
              className='flex w-full items-start justify-between border-b border-neutral-300 pb-[15px]'
              key={index}
            >
              <UserCard
                user={user}
                connections={{
                  following: user.following,
                  followers: user.followers,
                }}
              />
              <button className='w-[100px] py-1 border border-neutral-300 rounded-lg '>
                팔로우
              </button>
            </li>
          ))}
      </ul>
    </section>
  );
}
