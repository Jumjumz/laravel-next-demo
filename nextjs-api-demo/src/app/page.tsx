import axios from "axios";

async function getAxiosPost() {
  try {
    const response = await axios.get("http://laravel-api-demo.test/api/posts");
    return response.data;
  } catch (err) {
    console.error("Fetch failed", err);
  }
}

export default async function Home() {
  let posts = await getAxiosPost();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-black">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <ul className=" text-white">
          {posts.map((post: any) => (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <h4>{post.message}</h4>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
