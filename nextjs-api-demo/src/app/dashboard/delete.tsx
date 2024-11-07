"use client";

import api from "@/lib/api";
import { useEffect, useState } from "react";

interface UserId {
  id: string;
}

export default function Delete({ id }: UserId) {
  async function deleteAxiosUser() {
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

  return (
    <button onClick={deleteAxiosUser} className=" bg-red-600">
      Delete
    </button>
  );
}
