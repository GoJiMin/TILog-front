import { Post, SimplePost } from "../model/post";
import { client, urlFor } from "./sanity";

const SimpleProjection = `
    "id": _id,
    "userid": author->userid,
    "profileimage": author->profileimage,
    "image": photo,
    "description": description,
    "likes": count(likes),
    "comments": count(comments),
    "createdAt": _createdAt,
`;

const projection = `
    "id": _id,
    "userid": author->userid,
    "profileimage": author->profileimage,
    "image": photo,
    "description": description,
    likes[]->{
      "id": _id,
      userid,
      name,
      profileimage
    },
    comments[]{
      comment,
      author->{
        "id": _id,
        userid,
        name,
        profileimage
      }
    },
   "createdAt": _createdAt,
`;

export async function getFollowingPosts(id: string) {
  return client
    .fetch(
      `
    *[_type == "post" && author._ref == "${id}" || author._ref in *[_type == 'user' && _id == "${id}"]
    .following[]._ref] | order(_createdAt desc){${SimpleProjection}}
    `
    )
    .then((posts) =>
      posts?.map((post: SimplePost) => ({ ...post, image: urlFor(post.image) }))
    );
}

export async function getPost(id: string) {
  return client
    .fetch(`*[_type == "post" && _id == "${id}"][0]{${projection}}`)
    .then((post: Post) => ({ ...post, image: urlFor(post.image) }));
}
