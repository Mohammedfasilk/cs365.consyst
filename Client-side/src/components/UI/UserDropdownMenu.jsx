import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./Dropdown-menu";

import { SquareUserRound } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../utils/authConfig";

function UserDropdownMenu() {
  const { instance, accounts } = useMsal();
  const user = useMemo(() => accounts[0], [accounts]);
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    const fetchProfilePhoto = async () => {
      if (!user) return;

      try {
        const { accessToken } = await instance.acquireTokenSilent({
          ...loginRequest,
          account: user,
        });

        const res = await fetch("https://graph.microsoft.com/v1.0/me/photo/$value", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!res.ok) throw new Error("Photo not found");

        const blob = await res.blob();
        setAvatarUrl(URL.createObjectURL(blob));
      } catch (err) {
        console.warn("Unable to fetch profile photo:", err.message);
      }
    };

    fetchProfilePhoto();
  }, [instance, user]);

  const handleLogout = () => {
    instance.logoutRedirect({
      account: user,
      postLogoutRedirectUri: '/',
    });
    sessionStorage.clear();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-4 mr-4 cursor-pointer">
          <p className="text-white truncate w-40">{user?.name || "Guest"}</p>
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="profile-pic"
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <SquareUserRound className="text-white w-8 h-8" />
          )}
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserDropdownMenu;


