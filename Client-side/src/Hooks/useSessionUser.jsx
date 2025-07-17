import { useMsal } from '@azure/msal-react';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

export function useSessionUser() {
  const [user, setUser] = useState(null);
  const { accounts } = useMsal();
  const userList = useSelector((state) => state.users.userList);

  useEffect(() => {
    if (accounts && accounts.length > 0 && userList && userList.length > 0) {
      const msalUserName = accounts[0]?.name;
      
      // Find the user in userSlice that matches the MSAL username
      const foundUser = userList.find(user => 
        user.name === msalUserName || 
        user.username === msalUserName ||
        user.email === accounts[0]?.username
      );
      
      setUser(foundUser || null);
    }
  }, [accounts, userList]);  
  return { exists: !!user, user };
}