"use client";

import { useState } from "react";
import { ProfileUser } from "../model/user";
import useSWR from "swr";

type Props = {
  user: ProfileUser;
};

export default function UserPosts({ user: { id } }: Props) {
  const [query, setQuery] = useState("saved");

  const { data: posts, isLoading, error } = useSWR(`/api/users/${id}/${query}`);

  console.log(posts);

  return <></>;
}
