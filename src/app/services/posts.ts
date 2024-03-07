import { client } from "./sanity";

const projection = `
    "id": _id,
    "userid": author->userid,
    "name": author->name,
    "profileimage": author->profileimage,
    "image": photo,
    "description": description,
    "likes": likes[]->{
      userid,
      name,
      profileimage
    },
    "comments": count(comments),
    "createdAt": _createdAt
`;

export async function getFollowingPosts(id: string) {
  return client.fetch(
    `
    *[_type == "post" && author._ref == ${id} || author._ref in *[_type == 'user' && _id == "${id}"]
    .following[]._ref] | order(_createdAt desc){${projection}}
    `
  );
}
