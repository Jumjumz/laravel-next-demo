import { ColumnDef } from "@tanstack/react-table";
import Delete from "./delete";
import { Users } from "lucide-react";

interface Users {
  id: string;
  email: string;
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
    header: "Action",
    cell: ({ row }) => {
      <Delete id={row.original.id} />;
    },
  },
];
