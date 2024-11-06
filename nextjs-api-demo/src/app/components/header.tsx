"use client";

import { useAuthPersist } from "../stores/useAuthStore";

export default function Header() {
  const email = useAuthPersist((state) => state.email);
  return <div>{email}</div>;
}
