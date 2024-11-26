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

export default function UserTable() {
  const [users, setUsers] = useState<Users[] | undefined>();
}
