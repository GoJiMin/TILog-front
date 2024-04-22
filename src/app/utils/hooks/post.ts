import useSWR, { useSWRConfig } from "swr";
import { Comment, Post } from "@/app/model/post";
import { useCallback } from "react";

async function addComment(id: string, comment: string, createdAt: string) {
  return fetch("/api/comments", {
    method: "POST",
    body: JSON.stringify({ id, comment, createdAt }),
  }).then((res) => res.json());
}

export default function useDetailPost(id: string) {
  const {
    data: post,
    isLoading,
    error,
    mutate,
  } = useSWR<Post>(`/api/posts/${id}`);

  const { mutate: globalMutate } = useSWRConfig();

  const submitComment = useCallback(
    (comment: Comment) => {
      if (!post) return;

      const newPost = {
        ...post,
        comments: [...post.comments, comment],
      };

      return mutate(addComment(post.id, comment.comment, comment.createdAt), {
        optimisticData: newPost,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      }).then(() => globalMutate("/api/posts"));
    },
    [mutate, globalMutate, post]
  );

  return { post, isLoading, error, submitComment };
}
