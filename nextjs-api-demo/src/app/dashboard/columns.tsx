import { ColumnDef } from "@tanstack/react-table";

interface Users {
  id: string;
  email: string;
  role: string;
  status: string;
  action: string;
}

export const columns: ColumnDef<Users>[] = [
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "action",
    header: "Action",
  },
];
