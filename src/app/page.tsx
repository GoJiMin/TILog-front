import PostList from "./components/PostList";

export default async function HomePage() {
  return (
    <main className="flex justify-center relative">
      <section className="w-full">
        <PostList />
      </section>
    </main>
  );
}
