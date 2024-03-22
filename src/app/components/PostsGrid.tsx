import useSWR from "swr";
import MoonSpinner from "./ui/MoonSpinner";
import { SimplePost } from "../model/post";
import PostGridCard from "./ui/PostGridCard";

type Props = {
  id: string;
  query: string;
};

export default function PostsGrid({ id, query }: Props) {
  const {
    data: posts,
    isLoading: loading,
    error,
  } = useSWR<SimplePost[]>(`/api/users/${id}/${query}`);
  return (
    <section>
      {loading && <MoonSpinner />}
      <ul>
        {posts &&
          posts.map((post, index) => (
            <li key={post.id}>
              <PostGridCard post={post} priority={index < 6} />
            </li>
          ))}
      </ul>
    </section>
  );
}
