"use client";

import api from "@/lib/api";

import Logout from "../logout";
import Email from "@/app/components/email";

import { Metadata } from "next";
import Link from "next/link";
import { useAuthPut } from "@/app/stores/useAuthStore";

interface Users {
  id: string;
  email: string;
}

async function editAxiosUser({ id, email }: Users) {
  try {
    const response = await api.put(
      `update/${id}`,
      { email },
      { withCredentials: true }
    );
    return response.data;
  } catch (err) {
    console.error("Failed to update");
  }
}

export default function Edit() {
  const userId = useAuthPut((set) => set.id);
  const userEmail = useAuthPut((set) => set.email);
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
        </div>
      </main>
    </div>
  );
}
