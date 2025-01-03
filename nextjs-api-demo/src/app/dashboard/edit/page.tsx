"use client";

import api from "@/lib/api";

import Link from "next/link";

import { useAuthUpdate } from "@/app/stores/useAuthStore";
import { useRouter } from "next/navigation";

import Navbar from "@/app/components/navbar";

import { Button } from "@/components/ui/button";

interface Users {
  id: string;
  email: string;
}

export default function Edit() {
  // zustand global states
  const userId = useAuthUpdate((set) => set.id);
  const userEmail = useAuthUpdate((set) => set.email);
  const name = useAuthUpdate((set) => set.name);
  const userName = useAuthUpdate((set) => set.username);
  const editName = useAuthUpdate((set) => set.setName);
  const editUserName = useAuthUpdate((set) => set.setUserName);
  const clearData = useAuthUpdate((set) => set.clearData);

  const router = useRouter();

  async function editAxiosUser(event: React.FormEvent) {
    event.preventDefault();
    try {
      const response = await api.put(
        `update/${userId}`,
        {
          name: name,
          username: userName,
        },
        { withCredentials: true }
      );
      router.push("/dashboard");
      return response.data;
    } catch (err) {
      console.error("Failed to update");
    }
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-editName:var(--font-geist-sans)] bg-black">
      <main className="flex flex-col gap-8 row-start-2 items-center w-full sm:items-start">
        <Navbar />
        <div className=" flex flex-col w-full gap-4">
          <form
            method="PUT"
            onSubmit={editAxiosUser}
            className="flex flex-col w-56 gap-4 self-center"
          >
            <h2 className=" text-white self-center">{userEmail}</h2>
            <input
              className=" w-full h-8"
              type="text"
              placeholder={name}
              value={name}
              onChange={(e) => editName(e.target.value)}
            />
            <input
              className=" w-full h-8"
              type="text"
              placeholder={userName}
              value={userName}
              onChange={(e) => editUserName(e.target.value)}
            />
            <Button type="submit" className=" w-full h-8 self-center">
              Edit
            </Button>
          </form>
          <Link href="/dashboard">
            <Button
              onClick={clearData}
              className=" w-24 h-8 bg-white text-black"
            >
              Back
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
