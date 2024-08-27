import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { JwtPayload } from "jwt-decode";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";

interface CustomJwtPayload extends JwtPayload {
  role?: string;
}
const ProfileDropDown = ({ user }: { user: CustomJwtPayload }) => {
  console.log(user);

  const handleSignOut = () => {};
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <CgProfile className="ml-3 md:ml-0 hidden md:block w-8 h-8 cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {user?.role === "user" ? (
            <DropdownMenuItem>
              <Link to="my-bookings">My Bookings</Link>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem>
              <Link to="/dashboard">Dashboard</Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={handleSignOut}>SignOut</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ProfileDropDown;
