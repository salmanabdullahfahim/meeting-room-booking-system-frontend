import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { SignOut } from "@/redux/features/userSlice";
import { useAppDispatch } from "@/redux/hooks";
import { JwtPayload } from "jwt-decode";
import { Link } from "react-router-dom";

interface CustomJwtPayload extends JwtPayload {
  role?: string;
}
const ProfileDropDown = ({ user }: { user: CustomJwtPayload }) => {
  const dispatch = useAppDispatch();

  const handleSignOut = () => {
    dispatch(SignOut());
  };
  return (
    <div className="ml-60 md:ml-0">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>PF</AvatarFallback>
          </Avatar>
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
          <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
            SignOut
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProfileDropDown;
