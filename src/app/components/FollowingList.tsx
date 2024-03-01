"use client";

import useSWR from "swr";

export default function FollowingList() {
  const { data, isLoading, error } = useSWR("/api/profile");

  console.log(data);

  return <h2>Following List!</h2>;
}
