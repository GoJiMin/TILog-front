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
    <section>
      <ul>
        {tabs.map(({ type, text }, index) => (
          <li key={index} onClick={() => setQuery(type)}>
            <button>{text}</button>
          </li>
        ))}
      </ul>
      <PostsGrid id={id} query={query} />
    </section>
  );
}
