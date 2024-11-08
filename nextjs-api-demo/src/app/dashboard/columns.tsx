import { ColumnDef } from "@tanstack/react-table";
import Delete from "./delete";

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
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      return <Delete id={row.original.id} />;
    },
    //cell: (info) => info.getValue(),
  },
];
