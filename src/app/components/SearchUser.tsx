"use client";

import { FormEvent, useState } from "react";
import useSWR from "swr";
import { SearchIcon } from "./ui/icons";
import UserCard from "./ui/UserCard";
import { AuthUser, SearchUser } from "../model/user";
import MoonSpinner from "./ui/MoonSpinner";
import { useDebounce } from "../utils/hooks/useDebounce";
import SearchFollowButton from "./SearchFollowButton";

type Props = {
  loginUser: AuthUser | null;
};

export default function SearchUser({ loginUser }: Props) {
  const [keyword, setKeyword] = useState("");
  const [warning, setWarning] = useState(false);
  const debouncedKeyword = useDebounce(keyword, 800);
  const {
    data: users,
    isLoading: loading,
    error,
  } = useSWR<SearchUser[]>(`/api/search/${debouncedKeyword}`);

  const handleWarning = () => {
    setWarning(true);
    setTimeout(() => {
      setWarning(false);
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
    if (regex.test(e.target.value)) {
      handleWarning();
      return;
    }
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
            className='border-none w-full outline-none bg-transparent text-lg ml-2'
            type='text'
            placeholder={`${
              warning
                ? "검색어는 특수문자로 시작할 수 없어요."
                : "사용자를 검색해보세요!"
            }`}
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
              {loginUser && (
                <SearchFollowButton
                  isFollowing={user.isFollowing}
                  userId={loginUser.id}
                  searchUserId={user.id}
                />
              )}
            </li>
          ))}
      </ul>
    </section>
  );
}
