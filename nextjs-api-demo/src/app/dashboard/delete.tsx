"use client";

import api from "@/lib/api";

interface UserId {
  id: string;
  onDelete: () => void;
}

export default function Delete({ id, onDelete }: UserId) {
  async function deleteAxiosUser() {
    try {
      const response = await api.delete(`delete/${id}`, {
        withCredentials: true,
      });
      onDelete();
      return response.data;
    } catch (error) {
      console.error("Failed to Delete", error);
      return undefined;
    }
  }

  return (
    <button
      onClick={deleteAxiosUser}
      className=" bg-red-700 w-24 h-auto rounded-md"
    >
      Delete
    </button>
  );
}
