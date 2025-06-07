import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import { LogOut } from "lucide-react";
import Avatar from "react-avatar";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";

export function NavBar() {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
      {!user ? (
        <>
          <div className="absolute top-0 right-0 p-4 flex gap-1">
            <Link to="/log-in">
              <button className="btn">Log in</button>
            </Link>
            <Link to="/sign-up">
              <button className="btn">Sign up</button>
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="flex gap-1">
            <NavigationMenu className="flex gap-x-2">
              <Link to="/history">
                <button className="btn">History</button>
              </Link>
              <Link to="/vocabulary">
                <button className="btn">My Words</button>
              </Link>
              <Link to="/topic">
                <button className="btn">Topic</button>
              </Link>
            </NavigationMenu>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar
                  className="hover:cursor-pointer"
                  name={user?.username || ""}
                  size="40"
                  round={true}
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] bg-white min-w-56 rounded border border-gray-200 shadow-lg"
                align="start"
                sideOffset={4}
              >
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </>
      )}
    </div>
  );
}
