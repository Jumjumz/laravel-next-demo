"use client";

import api from "@/lib/api";
import { useState } from "react";

interface Register {
  _id: string;
  email: string;
  password: string;
}

async function postAxiosRegister() {
  const [message, setMessage] = useState<string | null>();
  //const [resData, setResData] = useState(Promise<Register | undefined>);
  try {
    const response = await api.post(
      "/register",
      {
        email: "jumzfromnextButton@gmail.com",
        password: "1234",
      },
      { withCredentials: true }
    );
    setMessage("New User has been Registered");
    //setResData(response.data);
  } catch (err) {
    console.error("Post failed", err);
    setMessage("Failed Registering the user");
  }
}

export default function Register() {
  //const [register, setRegister] = useState({});
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-black">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start"></main>
    </div>
  );
}
