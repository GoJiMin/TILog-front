import { client } from "./sanity";

export type UserType = {
  id: string;
  email?: string | null;
  name: string;
  userid: string;
};

export async function createUser({ id, name, email, userid }: UserType) {
  return client.createIfNotExists({
    _id: id,
    _type: "user",
    email,
    name,
    profileimage: "",
    userid,
    following: [],
    followers: [],
    bookmarks: [],
  });
}

export async function getUserById(id: string) {
  return client.fetch(
    `*[_type == "user" && _id == "${id}"][0]{
      ...,
      "id":_id,
      following[]->{ userid, name, profileimage },
      followers[]->{ userid, name, profileimage },
      "bookmarks": bookmarks[]->_id
    }`
  );
}

export async function getUserForProfile(userid: string) {
  return client.fetch(
    `*[_type == "user" && userid == "${userid}"][0]{
      "id":_id,
      userid,
      name,
      email,
      profileimage,
      "following": count(following),
      "followers": count(followers),
      "posts": count(*[_type == "post" && author._ref == ^._id]),
      "bookmarks": bookmarks[]->_id,
    }`,
    undefined,
    {
      next: { tags: [`/user/${userid}`] },
    }
  );
}

export async function getAllUser() {
  return client.fetch(
    `*[_type == "user"]{
       "id": _id,
       userid,
       name,
       email,
       profileimage,
       "following": count(following),
       "followers": count(followers),
       "bookmarks": bookmarks[]->_id
    }`
  );
}

export async function searchUsers(keyword?: string, loggedInUserId?: string) {
  const query = keyword
    ? `&& (name match "*${keyword}*") || (userid match "*${keyword}*")`
    : "";
  const projection = loggedInUserId
    ? `"isFollowing": _id in *[_type == "user" && _id == "${loggedInUserId}"].following[]._ref`
    : "";
  return client.fetch(
    `
    *[_type == "user" ${query}]{
      "id": _id,
      userid,
      name,
      email,
      profileimage,
      "following": count(following),
      "followers": count(followers),
      ${projection}
   }
    `,
    undefined,
    {
      next: { tags: ["search"] },
    }
  );
}

export async function addBookmark(userId: string, postId: string) {
  return client
    .patch(userId)
    .setIfMissing({ bookmarks: [] })
    .append("bookmarks", [
      {
        _ref: postId,
        _type: "reference",
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

export async function removeBookmark(userId: string, postId: string) {
  return client
    .patch(userId)
    .unset([`bookmarks[_ref == "${postId}"]`])
    .commit();
}

export async function follow(userId: string, targetUserId: string) {
  return client
    .transaction() //
    .patch(userId, (user) =>
      user.setIfMissing({ following: [] }).append("following", [
        {
          _ref: targetUserId,
          _type: "reference",
        },
      ])
    )
    .patch(targetUserId, (user) =>
      user.setIfMissing({ followers: [] }).append("followers", [
        {
          _ref: userId,
          _type: "reference",
        },
      ])
    )
    .commit({ autoGenerateArrayKeys: true });
}

export async function unFollow(userId: string, targetUserId: string) {
  return client
    .transaction()
    .patch(userId, (user) =>
      user.unset([`following[_ref == "${targetUserId}"]`])
    )
    .patch(targetUserId, (user) =>
      user.unset([`followers[_ref == "${userId}"]`])
    )
    .commit({ autoGenerateArrayKeys: true });
}
