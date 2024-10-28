"use client";

import api from "@/lib/api";
import { useState } from "react";

interface User {
  _id: string;
  email: string;
  password: string;
}

export default async function Dashboard() {
  const [email, setEmail] = useState<string | null>();
  const [password, setPassword] = useState<string | null>();
  async function getAxiosLogout(
    email: string | null,
    password: string | null
  ): Promise<User[] | undefined> {
    try {
      //await api.get("/sanctum/csrf-cookie", { withCredentials: true });

      const response = await api.post(
        "/logout",
        {
          email: setEmail(email),
          password: setPassword(password),
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
  return (
    <button onClick={() => getAxiosLogout(email!, password!)}>Logout</button>
  );
}
