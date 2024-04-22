export type Comment = {
  userid: string;
  profileimage?: string;
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
  comments: Comment[];
  createdAt: string;
};

export type SimplePost = Omit<Post, "comments"> & {
  likes: string[];
  comments: number;
};
