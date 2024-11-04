"use client";

import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface User {
  email: string;
}

export default function Logout({ email }: User) {
  const [regEmail, setRegEmail] = useState<string | undefined>();
  const router = useRouter();

  const logout = async () => {
    try {
      //await api.get("/sanctum/csrf-cookie", { withCredentials: true });
      await api.post(
        "/logout",
        { email: setRegEmail(email) },
        { withCredentials: true }
      );
      router.push("/login");
      return regEmail;
    } catch (err) {
      console.error("Fetch failed", err);
      return undefined;
    }
  };

  return (
    <button onClick={logout} className=" w-44 h-14 bg-white font-black">
      Logout
    </button>
  );
}
