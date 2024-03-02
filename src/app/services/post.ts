import { client } from "./sanity";

export async function getPostsByFollowing(id: string) {
  return client.fetch(
    `*[_type == "post" && author._ref in *[_type == 'user' && _id == "${id}"].following[]._ref]`
  );
}
