"use client";

import { useState } from "react";
import { ProfileUser } from "../model/user";
import PostsGrid from "./PostsGrid";

type Props = {
  user: ProfileUser;
};

const tabs = [
  { type: "posts", text: "게시물" },
  { type: "liked", text: "좋아요" },
  { type: "saved", text: "저장됨" },
];

export default function UserPosts({ user: { id } }: Props) {
  const [query, setQuery] = useState(tabs[0].type);

  return (
    <section className='mt-[20px] '>
      <ul className='flex justify-around text-lg text-neutral-500  mb-[10px]'>
        {tabs.map(({ type, text }, index) => (
          <li
            className={`w-full text-center p-2 border-b cursor-pointer ${
              type === query
                ? "font-semibold text-black border-black"
                : "border-neutral-300 "
            }`}
            key={index}
            onClick={() => setQuery(type)}
          >
            <button>{text}</button>
          </li>
        ))}
      </ul>
      <PostsGrid id={id} query={query} />
    </section>
  );
}
