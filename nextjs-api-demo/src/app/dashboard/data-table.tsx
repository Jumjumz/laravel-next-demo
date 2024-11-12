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
import Link from "next/link";
import Edit from "./edit/page";
import { useRouter } from "next/navigation";
import { useAuthPut } from "../stores/useAuthStore";

interface Users {
  id: string;
  email: string;
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

export function DataTable<TUsers, TValue>() {
  const [users, setUsers] = useState<Users[] | undefined>();
  const [destroy, setDestroy] = useState(false);

  const router = useRouter();
  const setId = useAuthPut((set) => set.setId);

  const columns: ColumnDef<Users>[] = [
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
      header: "Actions",
      cell: ({ row }) => {
        return (
          <div className=" w-full h-auto flex flex-row gap-4">
            <button
              onClick={() => deleteAxiosUser(row.original.id)}
              className=" bg-red-700 w-24 h-full rounded-md"
            >
              Delete
            </button>
            <button
              onClick={() => editUser(row.original.id)}
              className=" bg-green-600 w-24 h-full rounded-md"
            >
              Edit
            </button>
          </div>
        );
      },
    },
  ];

  async function deleteAxiosUser(id: string) {
    try {
      await api.delete(`delete/${id}`);
      setDestroy(true);
      setUsers((tableState) => tableState?.filter((state) => state.id !== id));
    } catch (err) {
      console.error("Failed to delete", err);
    }
  }

  function editUser(id: string) {
    setId(id);
    router.push("/dashboard/edit");
  }

  useEffect(() => {
    if (!destroy) {
      getAxiosUser().then((response) => {
        setUsers(response);
      });
    }
  }, []);

  const dataTable = useMemo(() => users ?? [], [users]);

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
