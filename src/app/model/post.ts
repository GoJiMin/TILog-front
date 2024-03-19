import { User } from "./user";

export type Comments = User & {
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
  likes: User[];
  comments: Comments[];
  createdAt: string;
};

export type SimplePost = Omit<Post, "comments"> & {
  likes: number;
  comments: number;
};
