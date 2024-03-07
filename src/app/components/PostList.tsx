"use client";

import useSWR from "swr";
import { SimplePost } from "../model/post";

export default function PostList() {
  const {
    data: posts,
    isLoading,
    error,
  } = useSWR<SimplePost[]>("/api/posts");

  console.log(posts);

  return (
    <section className='flex justify-center'>
      <ul className='flex flex-col gap-[15px]'>
        {posts &&
          posts.length > 0 &&
          posts.map((post, index) => <li key={index}>{post.description}</li>)}
      </ul>
    </section>
  );
}
