"use client";

import api from "@/lib/api";
import { useState } from "react";

interface Register {
  _id: string;
  email: string;
  password: string;
}

async function getAxiosUser(): Promise<Register[] | undefined> {
  try {
    const response = await api.post(
      "/register",
      {
        email: "jumzfromnext@gmail.com",
        password: "1234",
      },
      { withCredentials: true }
    );

    console.log(response.headers);
    return response.data;
  } catch (err) {
    console.error("Fetch failed", err);
    return undefined;
  }
}

export default function Register() {
  //let users = await getAxiosUser();
  let users = getAxiosUser();
  //const [register, setRegister] = useState({});
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-black">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start"></main>
    </div>
  );
}
