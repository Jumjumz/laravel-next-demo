import api from "@/lib/api";

interface User {
  _id: string;
  email: string;
  password: string;
}

async function getAxiosLogout(): Promise<User[] | undefined> {
  try {
    //await api.get("/sanctum/csrf-cookie", { withCredentials: true });

    const response = await api.get("/auth/users", { withCredentials: true });
    console.log(response.headers);
    return response.data;
  } catch (err) {
    console.error("Fetch failed", err);
    return undefined;
  }
}

export default async function Dashboard() {
  let users = await getAxiosLogout();
  return <button></button>;
}
