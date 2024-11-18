"use client";

import api from "@/lib/api";

import Link from "next/link";
import { useAuthUpdate } from "@/app/stores/useAuthStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Navbar from "@/app/components/navbar";

interface Users {
  id: string;
  email: string;
}

export default function Edit() {
  const userId = useAuthUpdate((set) => set.id);
  const userEmail = useAuthUpdate((set) => set.email);
  const name = useAuthUpdate((set) => set.name);
  const userName = useAuthUpdate((set) => set.username);
  const [editName, setEditName] = useState("");
  const [editUserName, setEditUserName] = useState("");

  const router = useRouter();

  async function editAxiosUser(event: React.FormEvent) {
    event.preventDefault();
    try {
      const response = await api.put(
        `update/${userId}`,
        {
          name: editName,
          username: editUserName,
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
              value={editName === "" ? name : editName}
              onChange={(e) => setEditName(e.target.value)}
            />
            <input
              className=" w-full h-8"
              type="text"
              placeholder={userName}
              value={editUserName !== "" ? editUserName : editUserName}
              onChange={(e) => setEditUserName(e.target.value)}
            />
            <button type="submit" className=" w-24 bg-blue-700 self-center">
              Edit
            </button>
          </form>
          <Link href="/dashboard">
            <button className=" w-24 h-8 bg-white text-black">Back</button>
          </Link>
        </div>
      </main>
    </div>
  );
}
