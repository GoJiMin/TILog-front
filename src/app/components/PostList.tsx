"use client";

import useSWR from "swr";
import { SimplePost } from "../model/post";
import PostCard from "./ui/PostCard";
import MoonSpinner from "./ui/MoonSpinner";

export default function PostList() {
  const {
    data: posts,
    isLoading: loading,
    error,
  } = useSWR<SimplePost[]>("/api/posts");

  return (
    <section className='flex justify-center'>
      {loading && <MoonSpinner />}
      <ul className='flex flex-col gap-[15px]'>
        {posts &&
          posts.map((post, index) => (
            <li key={index}>
              <PostCard post={post} priority={index < 2} />
            </li>
          ))}
      </ul>
    </section>
  );
}
