import { SimplePost } from "@/app/model/post";
import useSWR, { useSWRConfig } from "swr";

export function usePosts() {
  const {
    data: posts,
    isLoading: loading,
    error,
  } = useSWR<SimplePost[]>("/api/posts");
  const { mutate } = useSWRConfig();

  const setLike = (postId: string, like: boolean) => {
    fetch("/api/likes", {
      method: "PUT",
      body: JSON.stringify({ id: postId, like }),
    }).then(() => mutate("/api/posts"));
  };

  return { posts, loading, error, setLike };
}
