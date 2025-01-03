"use client";

import api from "@/lib/api";

import { useEffect, useState, useMemo } from "react";
import { GlobalTable } from "@/components/data-table";

import { ColumnDef } from "@tanstack/react-table";

import { useAuthPersist, useAuthUpdate } from "../stores/useAuthStore";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

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
  // this components states
  const [users, setUsers] = useState<Users[] | undefined>();
  const [destroy, setDestroy] = useState(false);
  // memoized the data to avoid users array to be undefine
  const dataTable = useMemo(() => users ?? [], [users]);

  const router = useRouter();

  const userEmail = useAuthPersist((set) => set.email);
  // zustand global state
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
        return userRole === "Admin" && userEmail !== row.original.email ? (
          <div className=" w-full h-auto flex flex-row gap-4">
            <Button
              onClick={() => deleteAxiosUser(users.id)}
              className="w-24 h-full"
              variant="destructive"
            >
              Delete
            </Button>
            <Button
              onClick={() => editUser(users)}
              className="w-24 h-full"
              variant="secondary"
            >
              Edit
            </Button>
          </div>
        ) : userEmail === row.original.email ? (
          <div className=" w-full h-auto flex flex-row gap-4">
            <Button
              onClick={() => editUser(users)}
              className="w-24 h-full"
              variant="secondary"
            >
              Edit
            </Button>
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
