import { useCacheKeys } from "@/app/context/CacheKeysContext";
import { SimplePost } from "@/app/model/post";
import { useCallback } from "react";
import useSWR from "swr";

async function updateLike(postId: string, like: boolean) {
  return fetch("/api/likes", {
    method: "PUT",
    body: JSON.stringify({ id: postId, like }),
  }).then((res) => res.json());
}

export function usePosts() {
  const cacheKeys = useCacheKeys();

  const {
    data: posts,
    isLoading: loading,
    error,
    mutate,
  } = useSWR<SimplePost[]>(cacheKeys.postsKey);

  const setLike = useCallback(
    (post: SimplePost, userId: string, like: boolean) => {
      const newPost = {
        ...post,
        likes: like
          ? [...post.likes, userId]
          : post.likes.filter((id) => id !== userId),
      };

      const newPosts = posts?.map((p) => (p.id === post.id ? newPost : p));

      return mutate(updateLike(post.id, like), {
        optimisticData: newPosts,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [mutate, posts]
  );

  return { posts, loading, error, setLike };
}
