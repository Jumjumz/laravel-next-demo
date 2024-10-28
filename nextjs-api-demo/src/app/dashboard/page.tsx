import api from "@/lib/api";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface User {
  _id: string;
  email: string;
  password: string;
}

async function getAxiosUser(): Promise<User[] | undefined> {
  try {
    const response = await api.get("/auth/users");
    console.log(response.headers);
    return response.data;
  } catch (err) {
    console.error("Fetch failed", err);
    return undefined;
  }
}

export default async function Dashboard() {
  let users = await getAxiosUser();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-black">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Table className=" text-xl text-white font-mono w-[100rem]">
          <TableCaption>Dashboard User List</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Password</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.password}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </div>
  );
}
