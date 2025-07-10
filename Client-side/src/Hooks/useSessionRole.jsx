import { useState, useEffect } from 'react';

export function useSessionRole() {
  const [role, setRole] = useState([]);
  const user = JSON.parse(sessionStorage.getItem('user'));
  useEffect(() => {
    setRole(user.roles)
  }, []);
  
  return role;
}