"use client";

import UserTable from "./usertable";
import Logout from "./logout";
import { useAuthStore } from "../stores/useAuthStore";

export default function Dashboard() {
  const loginEmail = useAuthStore((state) => state.email);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-black">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className=" w-full">
          <h2 className=" text-white">Email: {loginEmail} </h2>
        </div>
        <Logout email={loginEmail} />
        <div className=" w-[100rem]">
          <UserTable />
        </div>
      </main>
    </div>
  );
}
