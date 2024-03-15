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
