"use server";

import { revalidateTag } from "next/cache";

export async function revalidateSearch(tags: string) {
  revalidateTag(tags);
}
