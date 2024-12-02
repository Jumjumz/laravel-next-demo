"use client";

import api from "@/lib/api";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useAuthPersist } from "../stores/useAuthStore";

import Link from "next/link";

interface Register {
  _id: string;
  email: string;
  password: string;
}

export default function Register() {
  const ROLE = "Admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");

  const registerEmail = useAuthPersist((state) => state.setEmail);
  const registerRole = useAuthPersist((state) => state.setRole);

  const router = useRouter();

  async function postAxiosRegister(event: React.FormEvent) {
    event.preventDefault();
    try {
      await api.get("/sanctum/csrf-cookie", { withCredentials: true });

      const response = await api.post(
        "/register",
        {
          name: name,
          username: userName,
          email: email,
          password: password,
          role: ROLE,
        },
        { withCredentials: true }
      );

      registerEmail(response.data["email"]);
      registerRole(ROLE); // pass the role to global state

      router.push("/dashboard");
    } catch (err) {
      console.error("Register failed", err);
    }
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-black">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className=" w-80 h-72 flex flex-col gap-4">
          <form
            onSubmit={postAxiosRegister}
            method="POST"
            className="flex flex-row flex-wrap w-full gap-4 justify-center"
          >
            <h2 className="w-full text-center text-white">Register</h2>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Fullname"
              required
              className="w-full h-8"
            />
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Username"
              required
              className="w-full h-8"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full h-8"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full h-8"
            />
            <button type="submit" className="w-full h-8 bg-white rounded-md">
              Register
            </button>
          </form>
          <Link href="/login">
            <button className="w-full h-8 bg-green-600 rounded-md text-white">
              Login
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
