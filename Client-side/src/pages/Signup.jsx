
import { useNavigate } from 'react-router-dom';
import SignInButton from '../components/UI/SignInButton'
import { useEffect } from 'react';
import { useMsal } from '@azure/msal-react';


function Signup() {

  const navigate = useNavigate();
  const {accounts} = useMsal()
  
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user'));
        
    if (!user) {
      navigate('/');
    }
    else{
      navigate('/home')
    }
  }, [navigate]);
  
  return (
    <div className='flex flex-col h-screen w-screen justify-center items-center bg-blue-100/50'>
    <SignInButton/>
    </div>
  )
}

export default Signup