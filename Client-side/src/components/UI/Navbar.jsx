import { Grip } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from "../../assets/logo.png"
import UserDropdownMenu from './UserDropdownMenu';
import { useMsal } from '@azure/msal-react';

const Navbar = () => {

  const { accounts } = useMsal();
  const user = accounts[0]?.name;

  return (
    <nav className="min-h-12 flex justify-between items-center bg-[var(--csblue)] fixed w-screen top-0 z-50">
      <div className="flex justify-center items-center">
        <Link to="/home">
          <div className="hover:bg-[var(--xcsred)] h-12 w-14 grid place-items-center">
            <Grip className="w-5" color="white" />
          </div>
        </Link>
        <div className="ml-4">
          <img alt="logo" src={logo} width={200} height={30} />
        </div>
      </div>

      {user ? (
        <div className="flex items-center gap-4 mr-6">

          <UserDropdownMenu />
        </div>
      ) : null}
    </nav>
  );
};

export default Navbar;