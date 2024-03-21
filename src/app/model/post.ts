import { AuthUser } from "./user";

export type Comments = AuthUser & {
  comment: string;
  createdAt: string;
};

export type Post = {
  id: string;
  userid: string;
  name: string;
  profileimage: string;
  image: string;
  description: string;
  likes: AuthUser[];
  comments: Comments[];
  createdAt: string;
};

export type SimplePost = Omit<Post, "comments"> & {
  likes: number;
  comments: number;
};
