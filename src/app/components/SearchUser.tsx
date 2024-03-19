"use client";

import { useState } from "react";
import useSWR from "swr";

export default function SearchUser() {
  const [keyword, setKeyword] = useState("go");
  const { data, isLoading, error } = useSWR(`/api/search/${keyword}`);

  console.log(data);

  return <></>;
}
