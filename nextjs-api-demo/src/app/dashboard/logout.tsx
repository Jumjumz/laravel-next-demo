"use client";

import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { useAuthPersist } from "../stores/useAuthStore";

interface User {
  email: string;
}

export default function Logout() {
  const email = useAuthPersist((state) => state.email);
  const clearEmail = useAuthPersist((state) => state.clearEmail);
  const router = useRouter();

  const logout = async () => {
    try {
      await api.post("/logout", { email: email }, { withCredentials: true });
      clearEmail();
      router.push("/login");
    } catch (err) {
      console.error("Fetch failed", err);
    }
  };

  return (
    <button onClick={logout} className=" w-44 h-14 bg-white font-black">
      Logout
    </button>
  );
}
