import Logout from "../dashboard/logout";
import Email from "./email";

export default function Navbar() {
  return (
    <nav className="w-full flex flex-row justify-between">
      <Email />
      <Logout />
    </nav>
  );
}
