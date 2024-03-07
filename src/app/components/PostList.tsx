"use client";

import useSWR from "swr";
import { SimplePost } from "../model/post";
import PostCard from "./ui/PostCard";
import { MoonLoader } from "react-spinners";

export default function PostList() {
  const {
    data: posts,
    isLoading: loading,
    error,
  } = useSWR<SimplePost[]>("/api/posts");

  return (
    <section className='flex justify-center'>
      {loading && <MoonLoader color='#000000' size={35} />}
      <ul className='flex flex-col gap-[15px]'>
        {posts &&
          posts.map((post, index) => (
            <li key={index}>
              <PostCard post={post} />
            </li>
          ))}
      </ul>
    </section>
  );
}
