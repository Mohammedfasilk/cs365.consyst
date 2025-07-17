
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = true;

    if (!user) {
      navigate('/');
    }
  }, [navigate]);
};

