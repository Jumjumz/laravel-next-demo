import api from "@/lib/api";

interface UserId {
  id: string;
}

async function deleteAxiosUser({ id }: UserId) {
  try {
    const response = await api.delete(`delete/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to Delete", error);
    return undefined;
  }
}

export default function Delete() {}
