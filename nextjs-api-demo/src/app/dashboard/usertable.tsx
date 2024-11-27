"use client";

import api from "@/lib/api";

import { useEffect, useState, useMemo } from "react";
import { GlobalTable } from "@/components/data-table";

import { ColumnDef } from "@tanstack/react-table";

import { useAuthPersist, useAuthUpdate } from "../stores/useAuthStore";

import { useRouter } from "next/navigation";

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
  const [destroy, setDestroy] = useState(false);

  const dataTable = useMemo(() => users ?? [], [users]);

  const router = useRouter();

  const userEmail = useAuthPersist((set) => set.email);

  const setId = useAuthUpdate((set) => set.setId);
  const setEmail = useAuthUpdate((set) => set.setEmail);
  const setName = useAuthUpdate((set) => set.setName);
  const setUserName = useAuthUpdate((set) => set.setUserName);

  const userRole = useAuthPersist((set) => set.role);

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

  async function deleteAxiosUser(id: string) {
    try {
      await api.delete(`delete/${id}`);
      setDestroy(true);
      setUsers((tableState) => tableState?.filter((state) => state.id !== id));
    } catch (err) {
      console.error("Failed to delete", err);
    }
  }

  function editUser(user: Users) {
    setId(user.id);
    setEmail(user.email);
    setName(user.name);
    setUserName(user.username);
    router.push("/dashboard/edit");
  }

  return <GlobalTable data={dataTable} columns={columns} />;
}
