"use server";

import { revalidateTag } from "next/cache";

export async function revalidateProfile(userId: string) {
  revalidateTag(`/user/${userId}`);
}
