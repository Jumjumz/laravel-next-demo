"use client";

import api from "@/lib/api";
import { useEffect, useState } from "react";

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

export default function Delete() {
  const [destroy, setDestroy] = useState<UserId>();

  const handleDelete = () =>
    useEffect(() => {
      deleteAxiosUser(destroy!).then((response) => {
        setDestroy(response);
      });
    }, []);

  return (
    <button onClick={handleDelete} className=" bg-red-600">
      Delete
    </button>
  );
}
