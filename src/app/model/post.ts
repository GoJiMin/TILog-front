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
  likes: string[];
  comments: Comments[];
  createdAt: string;
};

export type SimplePost = Omit<Post, "comments"> & {
  likes: string[];
  comments: number;
};
