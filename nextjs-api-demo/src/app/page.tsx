import Link from "next/link";

import { Button } from "@/components/ui/button";

export default async function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-black">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div>
          <Link href="/login">
            <Button className=" w-24 h-8" variant="secondary">
              Login
            </Button>
          </Link>
        </div>
        <div>
          <Link href="/register">
            <Button className=" w-24 h-8">Register</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
