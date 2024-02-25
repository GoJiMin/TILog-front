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
    _type: "user",
    _id: id,
    email,
    name,
    profileimage: image,
    userid,
  });
}

export async function getUsers() {
  const users = await client.fetch('*[_type == "user"]');

  return users;
}
