export type User = {
  id: string;
  name: string;
  userid: string;
  email?: string;
  profileimage?: string;
};

export type SimpleUser = Pick<User, "userid" | "name" | "profileimage">;

export type DetailUser = User & {
  following: SimpleUser[];
  followers: SimpleUser[];
  bookmarks: string[];
};
