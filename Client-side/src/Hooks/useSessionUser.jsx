import { useMsal } from '@azure/msal-react';
import { useState, useEffect } from 'react';

export function useSessionUser() {
  const [user, setUser] = useState('');
  const { accounts } = useMsal();

  useEffect(() => {
    setUser(accounts[0]?.name);
  }, []);  
  return user;
}