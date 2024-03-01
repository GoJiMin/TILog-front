import { client } from "./sanity";

export type UserType = {
  id: string;
  email?: string | null;
  name: string;
  image?: string | null;
  userid: string;
};

export async function createUser({ id, name, email, image, userid }: UserType) {
  return client.createIfNotExists({
    _id: id,
    _type: "user",
    email,
    name,
    profileimage: image ?? "",
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
      following[]->{ userid, profileimage },
      followers[]->{ userid, profileimage },
      "bookmarks": bookmarks[]->_id
    }`
  );
}
