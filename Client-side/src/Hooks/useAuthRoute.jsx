import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";

export const useAuthRedirect = () => {
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();
  const { inProgress } = useMsal();

  useEffect(() => {
      if (inProgress === InteractionStatus.None) {        
      if (!isAuthenticated) {
        navigate("/");
      }
    }
  }, [isAuthenticated, inProgress, navigate]);
};