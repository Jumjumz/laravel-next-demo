"use client";

import api from "@/lib/api";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

interface User {
  _id: string;
  email: string;
  password: string;
}

async function getAxiosUser(): Promise<User[] | undefined> {
  try {
    const response = await api.get("/users", { withCredentials: true });
    //console.log(response.headers);
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

  return (
    <div className=" w-full h-auto">
      <Table className=" text-xl text-white font-mono w-[100rem]">
        <TableCaption>Dashboard User List</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Password</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.password}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
