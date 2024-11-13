"use client";

import api from "@/lib/api";

import Logout from "../logout";
import Email from "@/app/components/email";

import Link from "next/link";
import { useAuthUpdate } from "@/app/stores/useAuthStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Users {
  id: string;
  email: string;
}

export default function Edit() {
  const userId = useAuthUpdate((set) => set.id);
  const userEmail = useAuthUpdate((set) => set.email);
  const [editEmail, setEditEmail] = useState("");

  const router = useRouter();

  async function editAxiosUser(event: React.FormEvent) {
    event.preventDefault();
    try {
      const response = await api.put(
        `update/${userId}`,
        { email: editEmail },
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
          <form
            method="PUT"
            onSubmit={editAxiosUser}
            className="flex flex-col flex-wrap w-full gap-4 place-content-center"
          >
            <div className=" w-56 h-auto flex flex-col gap-4">
              <h2 className=" text-white">{userEmail}</h2>
              <input
                className=" w-56 h-8"
                type="email"
                placeholder={userEmail}
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
              />
              <button type="submit" className=" w-24 bg-blue-700 self-center">
                Edit
              </button>
            </div>
          </form>
          <Link href="/dashboard">
            <button className=" w-24 h-8 bg-white text-black">Back</button>
          </Link>
        </div>
      </main>
    </div>
  );
}
