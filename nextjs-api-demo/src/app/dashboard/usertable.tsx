"use client";

import api from "@/lib/api";

import { DataTable } from "./data-table";
import { columns } from "./columns";

import { useEffect, useState } from "react";

interface User {
  id: string;
  email: string;
}

export default function UserTable() {
  const [users, setUsers] = useState<User[] | undefined>();
}
