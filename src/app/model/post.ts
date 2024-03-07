import { SimpleUser } from "./user";

export type Comments = SimpleUser & {
  comment: string;
};

export type Post = {
  id: string;
  userid: string;
  name: string;
  profileimage: string;
  image: string;
  description: string;
  likes: SimpleUser[];
  comments: Comments[];
  createAt: string;
};

export type SimplePost = Omit<Post, "comments"> & {
  comments: number;
};
