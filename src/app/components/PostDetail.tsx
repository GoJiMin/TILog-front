import useSWR from "swr";
import { SimplePost } from "../model/post";

type Props = {
  post: SimplePost;
};

export default function PostDetail({ post }: Props) {
  const { id, userid, profileimage, image, description, createdAt } = post;
  const { data } = useSWR(`/api/posts/${id}`);

  console.log(data);

  return <section className='w-[1000px] h-[800px]'></section>;
}
