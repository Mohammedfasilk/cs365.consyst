import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./Dropdown-menu";

import { SquareUserRound } from "lucide-react";
import { useMicrosoftUser } from "../../Hooks/useMicrosoftUser";
import { useMsal } from "@azure/msal-react";

function UserDropdownMenu() {
  const { instance } = useMsal();
  const user = useMicrosoftUser() || '';

  const handleLogout = () => {
  const accounts = instance.getAllAccounts();

  if (accounts.length > 0) {
    instance.logoutRedirect({
      account: accounts[0],
      postLogoutRedirectUri: '/',
    });
  } else {
    instance.logoutRedirect({
      postLogoutRedirectUri: '/',
    });
  }
  sessionStorage.clear();
};

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center mr-4 gap-4 cursor-pointer">
          {user ? (
            <>
              <p className="text-white truncate w-40">{user.displayName}</p>
              {user.photo ? (
                <img src='' width={32} height={32} alt="profile-pic" />
              ) : <SquareUserRound className="text-white" />}
            </>
          ) : (
            <p className="text-white truncate w-40">Guest</p>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserDropdownMenu;
