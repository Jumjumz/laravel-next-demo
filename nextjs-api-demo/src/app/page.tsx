import Link from "next/link";

export default async function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-black">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Link href="/login">
          <button className=" w-24 h-8 bg-white text-black">Login</button>
        </Link>
        <link href="/register">
          <button className=" w-24 h-8 bg-white text-black">Register</button>
        </link>
      </main>
    </div>
  );
}
