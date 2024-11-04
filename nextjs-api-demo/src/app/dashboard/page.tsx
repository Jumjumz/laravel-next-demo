import UserTable from "./usertable";
import Logout from "./logout";
import { useSearchParams } from "next/navigation";

export default function Dashboard() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-black">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className=" w-full">
          <h2 className=" text-white">Email:</h2>
        </div>
        <Logout email="jumjumramos@gmail.com" />
        <div className=" w-[100rem]">
          <UserTable />
        </div>
      </main>
    </div>
  );
}
