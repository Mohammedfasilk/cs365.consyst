
import { useIsAuthenticated } from '@azure/msal-react';
import SignInButton from '../components/UI/SignInButton'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Signup() {
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);
  
  return (
    <div className='flex flex-col h-screen w-screen justify-center items-center bg-blue-100/50'>
    <SignInButton/>
    </div>
  )
}

export default Signup