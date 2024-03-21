export type AuthUser = {
  id: string;
  name: string;
  userid: string;
  email?: string;
  profileimage?: string;
};

export type SearchUser = AuthUser & {
  following: number;
  followers: number;
};

export type HomeUser = AuthUser & {
  following: AuthUser[];
  followers: AuthUser[];
  bookmarks: string[];
};

export type ProfileUser = SearchUser & {
  bookmarks: string[];
  posts: number;
};
