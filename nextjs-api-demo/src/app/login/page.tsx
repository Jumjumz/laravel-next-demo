"use client";

import api from "@/lib/api";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useAuthPersist } from "../stores/useAuthStore";

import { Button } from "@/components/ui/button";

import Link from "next/link";

export default function Login() {
  const loginEmail = useAuthPersist((state) => state.setEmail);
  const userRole = useAuthPersist((state) => state.setRole);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  async function postAxiosLogin(event: React.FormEvent) {
    //const [resData, setResData] = useState(Promise<Register | undefined>);
    event.preventDefault();
    try {
      await api.get("/sanctum/csrf-cookie", { withCredentials: true });

      const response = await api.post(
        "/login",
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      );

      userRole(response.data["role"]);
      loginEmail(response.data["email"]);

      router.push("/dashboard");
    } catch (err) {
      console.error("Post failed", err);
    }
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-black">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className=" w-80 h-72 flex flex-col gap-4">
          <form
            onSubmit={postAxiosLogin}
            method="POST"
            className="flex flex-row flex-wrap w-full gap-4 justify-center"
          >
            <h2 className="w-full text-center text-white">Log In</h2>
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
            <Button type="submit" variant="secondary" className="w-full h-8">
              Login
            </Button>
          </form>
          <Link href="/register">
            <Button className="w-full h-8">Register</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
