"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useMemo, useState } from "react";

import api from "@/lib/api";

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
    id: "action",
    accessorKey: "action",
    header: "Action",
  },
];

interface DataTableProps<Users, TValue> {
  columns: ColumnDef<Users, TValue>[];
  data: Users[];
}

// fetch users in the backend
async function getAxiosUser(): Promise<Users[] | undefined> {
  try {
    const response = await api.get("/users", { withCredentials: true });
    return response.data;
  } catch (err) {
    console.error("Fetch failed", err);
    return undefined;
  }
}

export function DataTable<TData, TValue>() {
  const [user, setUsers] = useState<Users[] | undefined>();
  const [destroy, setDestroy] = useState(false);

  useEffect(() => {
    getAxiosUser().then((response) => {
      setUsers(response);
    });
  }, []);

  const dataTable = useMemo(() => user ?? [], [user]);

  async function deleteAxiosUser(id: string) {
    try {
      await api.delete(`delete/${id}`);
      setDestroy(true);
      setUsers((tableState) => tableState?.filter((state) => state.id !== id));
    } catch (err) {
      console.error("Failed to delete", err);
    }
  }

  const table = useReactTable({
    data: dataTable,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className=" rounded-md border h-[640px] flex flex-col justify-between">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className=" text-white font-mono">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows?.map((row) => (
              <TableRow key={row.original.id} data-state={row.original.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
                <TableCell>
                  <button onClick={() => deleteAxiosUser(row.original.id)}>
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Loading...
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className=" flex flex-row w-full justify-end h-16 border-t-[1px]">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className=" h-full w-36 text-white"
        >
          Previous
        </button>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className=" h-full w-36 text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
}
