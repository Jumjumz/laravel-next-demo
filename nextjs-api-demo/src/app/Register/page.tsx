"use client";

import api from "@/lib/api";
import { useState } from "react";

interface Register {
  _id: string;
  email: string;
  password: string;
}

export default function Register() {
  //const [register, setRegister] = useState({});
  const [message, setMessage] = useState<string | null>();
  async function postAxiosRegister() {
    //const [resData, setResData] = useState(Promise<Register | undefined>);
    try {
      await api.get("/sanctum/csrf-cookie", { withCredentials: true });

      await api.post(
        "/register",
        {
          email: "jumzfromNextButton@gmail.com",
          password: "1234",
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
        <h2 className="w-full text-center text-white">Register a user</h2>
        <button
          onClick={postAxiosRegister}
          className="w-44 h-16 bg-white rounded-md"
        >
          Register a User
        </button>
        <h4 className="w-full text-center text-white">{message}</h4>
      </main>
    </div>
  );
}
