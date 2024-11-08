"use client";

import api from "@/lib/api";

import { DataTable } from "./data-table";
import { columns } from "./columns";

import { useEffect, useState } from "react";

interface User {
  id: string;
  email: string;
}

async function getAxiosUser(): Promise<User[] | undefined> {
  try {
    const response = await api.get("/users", { withCredentials: true });
    return response.data;
  } catch (err) {
    console.error("Fetch failed", err);
    return undefined;
  }
}

export default function UserTable() {
  const [users, setUsers] = useState<User[] | undefined>();

  useEffect(() => {
    getAxiosUser().then((response) => {
      setUsers(response);
    });
  }, []);

  return <DataTable columns={columns} data={users!} />;
}
