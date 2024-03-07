import { SimplePost } from "../model/post";
import { client, urlFor } from "./sanity";

const projection = `
    "id": _id,
    "userid": author->userid,
    "profileimage": author->profileimage,
    "image": photo,
    "description": description,
    "likes": count(likes),
    "comments": count(comments),
    "createdAt": _createdAt,
`;

export async function getFollowingPosts(id: string) {
  return client
    .fetch(
      `
    *[_type == "post" && author._ref == ${id} || author._ref in *[_type == 'user' && _id == "${id}"]
    .following[]._ref] | order(_createdAt desc){${projection}}
    `
    )
    .then((posts) =>
      posts.map((post: SimplePost) => ({ ...post, image: urlFor(post.image) }))
    );
}
