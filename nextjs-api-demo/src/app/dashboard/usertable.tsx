"use client";

import api from "@/lib/api";

import { DataTable } from "./data-table";
import { columns } from "./columns";

import { useEffect, useState } from "react";
import { GlobalTable } from "@/components/data-table";

import { ColumnDef } from "@tanstack/react-table";

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

  const columns: ColumnDef<Users>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "username",
      header: "Username",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
    },
    {
      accessorKey: "action",
      header: "Actions",
      cell: ({ row }) => {
        const users = {
          id: row.original.id,
          email: row.original.email,
          name: row.original.name,
          username: row.original.username,
          role: row.original.role,
        };
        return userRole === "Admin" ? (
          <div className=" w-full h-auto flex flex-row gap-4">
            <button
              onClick={() => deleteAxiosUser(users.id)}
              className=" bg-red-700 w-24 h-full rounded-md"
            >
              Delete
            </button>
            <button
              onClick={() => editUser(users)}
              className=" bg-green-600 w-24 h-full rounded-md"
            >
              Edit
            </button>
          </div>
        ) : userEmail === row.original.email ? (
          <div className=" w-full h-auto flex flex-row gap-4">
            <button
              onClick={() => editUser(users)}
              className=" bg-green-600 w-24 h-full rounded-md"
            >
              Edit
            </button>
          </div>
        ) : (
          <div></div>
        );
      },
    },
  ];

  useEffect(() => {
    getAxiosUser().then((response) => {
      setUsers(response);
    });
  }, []);

  return <GlobalTable data={users!} columns={columns} />;
}
