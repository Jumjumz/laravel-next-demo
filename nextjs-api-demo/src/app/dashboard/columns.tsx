import { ColumnDef, flattenBy } from "@tanstack/react-table";
import Delete from "./delete";
import { Checkbox } from "@radix-ui/react-checkbox";

interface Users {
  id: string;
  email: string;
}

export const columns: ColumnDef<Users>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
        aria-label="Select all"
        className=" w-4 h-4 "
      />
    ),
    cell: ({ row }) => {
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className=" wh-4 h-4 bg-white"
      />;
    },
    enableSorting: false,
    enableHiding: false,
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
