import Logout from "./logout";
import Email from "../components/email";
import { Metadata } from "next";
import { DataTable } from "./data-table";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard Demo",
};

export default function Dashboard() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-black">
      <main className="flex flex-col gap-8 row-start-2 items-center w-full sm:items-start">
        <nav className=" w-full flex flex-row justify-between">
          <Email />
          <Logout />
        </nav>
        <div className=" w-full">
          <DataTable />
        </div>
      </main>
    </div>
  );
}
