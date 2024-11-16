import { LogOut } from "lucide-react";
import Email from "./email";

export default function Navbar() {
  return (
    <nav className="w-full flex flex-row justify-between">
      <Email />
      <LogOut />
    </nav>
  );
}
