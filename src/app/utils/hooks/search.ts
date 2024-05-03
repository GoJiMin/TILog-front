import { SearchUser } from "@/app/model/user";
import { useCallback, useState } from "react";
import useSWR from "swr";
import { useDebounce } from "./useDebounce";

async function updateFollow(targetUserId: string, follow: boolean) {
  return fetch("/api/follow", {
    method: "PUT",
    body: JSON.stringify({ id: targetUserId, follow }),
  }).then((res) => res.json());
}

export default function useSearch() {
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce(keyword, 800);
  const {
    data: users,
    isLoading: loading,
    error,
    mutate,
  } = useSWR<SearchUser[]>(`/api/search/${debouncedKeyword}`);

  const toggleFollow = useCallback(
    (targetUserId: string, follow: boolean) => {
      return mutate(updateFollow(targetUserId, follow), {
        populateCache: false,
      });
    },
    [mutate]
  );

  return { setKeyword, users, loading, error, keyword, toggleFollow };
}
