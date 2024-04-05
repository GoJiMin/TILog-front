import { SimplePost } from "@/app/model/post";
import useSWR from "swr";

async function updateLike(postId: string, like: boolean) {
  return fetch("/api/likes", {
    method: "PUT",
    body: JSON.stringify({ id: postId, like }),
  }).then((res) => res.json());
}

export function usePosts() {
  const {
    data: posts,
    isLoading: loading,
    error,
    mutate,
  } = useSWR<SimplePost[]>("/api/posts");

  const setLike = (post: SimplePost, userId: string, like: boolean) => {
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
  };

  return { posts, loading, error, setLike };
}
