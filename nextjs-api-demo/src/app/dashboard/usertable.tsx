"use client";

import api from "@/lib/api";

import { DataTable } from "./data-table";
import { columns } from "./columns";

import { useEffect, useState } from "react";

interface Users {
  id: string;
  email: string;
  name: string;
  username: string;
  role: string;
}

// fetch users from the backend
async function getAxiosUser(): Promise<Users[] | undefined> {
  try {
    const response = await api.get("/users", { withCredentials: true });
    return response.data;
  } catch (err) {
    console.error("Fetch failed", err);
    return undefined;
  }
}

export default function UserTable() {
  const [users, setUsers] = useState<Users[] | undefined>();

  useEffect(() => {
    getAxiosUser().then((response) => {
      setUsers(response);
    });
  }, []);
}
