"use client";

import api from "@/lib/api";
import { useState } from "react";

interface Register {
  _id: string;
  email: string;
  password: string;
}

export default function Register({ email, password }: Register) {
  //const [register, setRegister] = useState({});
  const [message, setMessage] = useState<string | null>();
  async function postAxiosRegister() {
    //const [resData, setResData] = useState(Promise<Register | undefined>);
    try {
      await api.get("/sanctum/csrf-cookie", { withCredentials: true });

      await api.post(
        "/register",
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      );
      setMessage("User Registered!");
    } catch (err) {
      console.error("Post failed", err);
      setMessage("Failed to Register");
    }
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-black">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className=" w-80 h-72">
          <form
            onSubmit={postAxiosRegister}
            method="POST"
            className="flex flex-row flex-wrap w-full gap-4 justify-center"
          >
            <h2 className="w-full text-center text-white">Register a User</h2>
            <input
              type="email"
              value={email}
              placeholder="Email"
              required
              className="w-full h-8"
            />
            <input
              type="password"
              value={password}
              placeholder="Password"
              required
              className="w-full h-8"
            />
            <button type="submit" className="w-full h-8 bg-white rounded-md">
              Register
            </button>
          </form>
          <h4 className="w-full text-center text-white">{message}</h4>
        </div>
      </main>
    </div>
  );
}
