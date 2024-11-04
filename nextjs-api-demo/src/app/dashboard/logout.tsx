"use client";

import api from "@/lib/api";
import { useState } from "react";

interface User {
  _id: string;
  email: string;
}

export default function Logout({ email }: User) {
  const [regEmail, setRegEmail] = useState<string | null>();
  const [regPassword, setRegPassword] = useState<string | null>();
  async function getAxiosLogout() {
    try {
      //await api.get("/sanctum/csrf-cookie", { withCredentials: true });

      await api.post(
        "/logout",
        {
          email: setRegEmail(email),
          password: setRegPassword(password),
        },
        { withCredentials: true }
      );
      return { regEmail, regPassword };
    } catch (err) {
      console.error("Fetch failed", err);
      return null;
    }
  }
  return <button onClick={() => getAxiosLogout()}>Logout</button>;
}
