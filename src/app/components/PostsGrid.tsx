import MoonSpinner from "./ui/MoonSpinner";
import PostGridCard from "./ui/PostGridCard";
import { usePosts } from "../utils/hooks/posts";

export default function PostsGrid({ query }: { query: string }) {
  const { posts, loading } = usePosts();

  return (
    <section>
      {loading && <MoonSpinner position={"absolute"} />}
      {posts && posts.length === 0 && (
        <p className="text-center text-lg mt-[20px]">
          {query === "posts" && "아직 작성한 게시물이 없어요."}
          {query === "liked" && "아직 좋아요한 게시물이 없어요."}
          {query === "saved" && "아직 저장한 게시물이 없어요."}
        </p>
      )}
      <ul className="grid grid-cols-3 gap-4">
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
