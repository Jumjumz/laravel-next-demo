"use client";

import { useAuthPersist } from "../stores/useAuthStore";

export default function Header() {
  const email = useAuthPersist((state) => state.email);
  return (
    <div>
      <h2 className=" text-white font-mono text-xl">{email}</h2>
    </div>
  );
}
