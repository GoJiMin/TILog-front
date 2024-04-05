import { Post, SimplePost } from "../model/post";
import { client, urlFor } from "./sanity";

const simpleProjection = `
    "id": _id,
    "userid": author->userid,
    "name": author->name,
    "profileimage": author->profileimage,
    "image": photo,
    "description": description,
    "likes": likes[]->_id,
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
      "id": author->_id,
      "userid": author->userid,
      "name": author->name,
      "profileimage": author->profileimage,
      "createdAt": _createdAt,
    },
   "createdAt": _createdAt,
`;

export async function getFollowingPosts(id: string) {
  return client
    .fetch(
      `
    *[_type == "post" && author._ref == "${id}" || author._ref in *[_type == 'user' && _id == "${id}"]
    .following[]._ref] | order(_createdAt desc){${simpleProjection}}
    `
    )
    .then(ImageUrlBuilder);
}

export async function getPost(id: string) {
  return client
    .fetch(`*[_type == "post" && _id == "${id}"][0]{${projection}}`)
    .then((post: Post) => ({ ...post, image: urlFor(post.image) }));
}

export async function getPostsOf(id: string) {
  return client
    .fetch(
      `*[_type == "post" && author._ref == "${id}"] | order(_createdAt desc){${simpleProjection}}`
    )
    .then(ImageUrlBuilder);
}

export async function getLikedPostsOf(id: string) {
  return client
    .fetch(
      `*[_type == "post" && "${id}" in likes[]._ref] | order(_createdAt desc){${simpleProjection}}`,
      undefined,
      { cache: "no-store" }
    )
    .then(ImageUrlBuilder);
}

export async function getSavedPostsOf(id: string) {
  return client
    .fetch(
      `*[_type == "post" && _id in *[_type == "user" && _id == "${id}"].bookmarks[]._ref] | order(_createdAt desc){${simpleProjection}}`,
      undefined,
      { cache: "no-store" }
    )
    .then(ImageUrlBuilder);
}

function ImageUrlBuilder(posts: SimplePost[]) {
  return posts.map((post) => ({ ...post, image: urlFor(post.image) }));
}

export async function likePost(postId: string, userId: string) {
  return client
    .patch(postId)
    .setIfMissing({ likes: [] })
    .append("likes", [
      {
        _ref: userId,
        _type: "reference",
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

export async function disLikePost(postId: string, userId: string) {
  return client
    .patch(postId)
    .unset([`likes[_ref=="${userId}"]`])
    .commit();
}
