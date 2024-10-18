import api from "@/lib/api";

interface Post {
  id: number;
  title: string;
  message: string;
}

async function getAxiosPost(): Promise<Post[] | undefined> {
  try {
    const response = await api.get("/posts");
    return response.data;
  } catch (err) {
    console.error("Fetch failed", err);
    return undefined;
  }
}

export default async function Home() {
  let posts = await getAxiosPost();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-black">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <ul className=" text-white font-mono text-xl">
          {posts?.map((post: Post) => (
            <li key={post.id} className="mb-6">
              <h2>{post.title}</h2>
              <h4>{post.message}</h4>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
