import { HomeUser } from "@/app/model/user";
import useSWR from "swr";

async function updateBookmark(postId: string, bookmark: boolean) {
  return fetch("/api/bookmarks", {
    method: "PUT",
    body: JSON.stringify({ id: postId, bookmark }),
  }).then((res) => res.json());
}

export default function useProfile() {
  const {
    data: user,
    isLoading: loading,
    error,
    mutate,
  } = useSWR<HomeUser>("/api/profile");

  const setBookmark = (postId: string, bookmark: boolean) => {
    if (!user) return;

    const bookmarks = user.bookmarks;
    const newUser = {
      ...user,
      bookmarks: bookmark
        ? [...bookmarks, postId]
        : bookmarks.filter((b) => b !== postId),
    };

    return mutate(updateBookmark(postId, bookmark), {
      optimisticData: newUser,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    });
  };

  return { user, loading, error, setBookmark };
}
