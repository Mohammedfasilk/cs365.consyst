import { useMsal } from "@azure/msal-react";
import { useEffect, useState } from "react";
import axios from "axios";

export function useMicrosoftUser() {
  const { instance, accounts } = useMsal();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserProfile = async () => {
      if (accounts.length > 0) {
        try {
          const response = await instance.acquireTokenSilent({
            scopes: ["User.Read"],
            account: accounts[0],
          });

          const graphResponse = await axios.get(
            "https://graph.microsoft.com/v1.0/me",
            {
              headers: {
                Authorization: `Bearer ${response.accessToken}`,
              },
            }
          );

          setUser(graphResponse.data);
        } catch (error) {
          console.error("Failed to fetch MS user", error);
        }
      }
    };

    getUserProfile();
  }, [accounts, instance]);

  return user;
}
