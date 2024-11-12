"use client";

import api from "@/lib/api";

import Logout from "../logout";
import Email from "@/app/components/email";

import { Metadata } from "next";
import Link from "next/link";
import { useAuthPut } from "@/app/stores/useAuthStore";
import { useRouter } from "next/navigation";

interface Users {
  id: string;
  email: string;
}

export default function Edit() {
  const userId = useAuthPut((set) => set.id);
  const userEmail = useAuthPut((set) => set.email);

  const router = useRouter();

  async function editAxiosUser() {
    try {
      const response = await api.put(
        `update/${userId}`,
        { email: "jumzfromEdit@gmail.com" },
        { withCredentials: true }
      );
      router.push("/dashboard");
      return response.data;
    } catch (err) {
      console.error("Failed to update");
    }
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-black">
      <main className="flex flex-col gap-8 row-start-2 items-center w-full sm:items-start">
        <nav className=" w-full flex flex-row justify-between">
          <Email />
          <Logout />
        </nav>
        <div className=" w-full">
          <h2 className="text-white">{userId}</h2>
          <h2 className=" text-white">{userEmail}</h2>
          <Link
            href="/dashboard"
            className=" w-24 h-8 bg-white text-black text-center"
          >
            Back
          </Link>
          <button onClick={editAxiosUser} className=" w-24 bg-blue-700">
            Edit
          </button>
        </div>
      </main>
    </div>
  );
}
