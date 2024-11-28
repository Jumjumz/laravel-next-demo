"use client";

import { useAuthPersist } from "../stores/useAuthStore";

export default function Email() {
  const email = useAuthPersist((state) => state.email);
  const role = useAuthPersist((state) => state.role);
  return (
    <div className=" flex flex-row gap-4">
      <h2 className=" text-white font-mono text-xl">{email}</h2>
      <h2 className=" text-white font-mono text-xl">: {role}</h2>
    </div>
  );
}
