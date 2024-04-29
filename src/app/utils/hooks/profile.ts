import { HomeUser } from "@/app/model/user";
import { useCallback } from "react";
import useSWR from "swr";

async function updateBookmark(postId: string, bookmark: boolean) {
  return fetch("/api/bookmarks", {
    method: "PUT",
    body: JSON.stringify({ id: postId, bookmark }),
  }).then((res) => res.json());
}

async function updateFollow(targetUserId: string, follow: boolean) {
  return fetch("/api/follow", {
    method: "PUT",
    body: JSON.stringify({ id: targetUserId, follow }),
  }).then((res) => res.json());
}

export default function useProfile() {
  const {
    data: user,
    isLoading: loading,
    error,
    mutate,
  } = useSWR<HomeUser>("/api/profile");

  const setBookmark = useCallback(
    (postId: string, bookmark: boolean) => {
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
    },
    [user, mutate]
  );

  const toggleFollow = useCallback(
    (targetUserId: string, follow: boolean) => {
      return mutate(updateFollow(targetUserId, follow), {
        populateCache: false,
      });
    },
    [mutate]
  );

  return { user, loading, error, setBookmark, toggleFollow };
}
