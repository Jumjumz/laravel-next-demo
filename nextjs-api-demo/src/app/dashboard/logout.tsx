"use client";

import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { useAuthPersist } from "../stores/useAuthStore";

import { Button } from "@/components/ui/button";

interface User {
  email: string;
}

export default function Logout() {
  const email = useAuthPersist((state) => state.email);
  const clearEmail = useAuthPersist((state) => state.clearEmail);
  const clearRole = useAuthPersist((state) => state.clearRole);

  const router = useRouter();

  const logout = async () => {
    try {
      await api.post("/logout", { email: email }, { withCredentials: true });
      clearEmail();
      clearRole();
      router.push("/login");
    } catch (err) {
      console.error("Fetch failed", err);
    }
  };

  return (
    <Button onClick={logout} variant="default">
      Logout
    </Button>
  );
}
