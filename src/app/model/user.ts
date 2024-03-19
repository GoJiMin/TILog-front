export type User = {
  id: string;
  name: string;
  userid: string;
  email?: string;
  profileimage?: string;
};

export type SimpleUser = User & {
  following: number;
  followers: number;
};

export type DetailUser = User & {
  following: User[];
  followers: User[];
  bookmarks: string[];
};
