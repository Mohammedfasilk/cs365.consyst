import { Lock, Mail } from "lucide-react";
import logo from "../../../src/assets/logo.png";
import microsoftLogo from "../../../src/assets/microsoft-logo.svg";
import { Input } from "./Input";
import { Button } from "./Button";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../utils/authConfig";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import ScaleLoading from "./ScaleLoader";
import { useDispatch } from "react-redux";
import { setSessionRole, setSessionUser } from "../../Redux/Slices/sessionSlice";

function SignInButton() {

  const [loading,setLoading] = useState()
  const { instance } = useMsal();
  const navigate = useNavigate();
  const dispatch = useDispatch();

 const handleLogin = async () => {
  try {
    const loginResponse = await instance.loginPopup({
      ...loginRequest,
      prompt: "select_account",
    });

    const account = loginResponse.account;
    
    if (!account) {
      console.error("No account returned after login.");
      return;
    }

    const tokenResponse = await instance.acquireTokenSilent({
      ...loginRequest,
      account,
    });

    setLoading(true);
    const res = await axios.post(
      `${import.meta.env.VITE_CS365_URI}/api/auth`,
      { current_user: account.username }
    );

    const userExist = res.data;

    if (userExist.success) {
      const date = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
      sessionStorage.setItem("user", JSON.stringify(userExist.user));
      dispatch(setSessionUser(userExist.user.name))
      dispatch(setSessionRole(userExist.user.roles))
      setLoading(false);
      navigate("/home");

      const data = {
        username:account.name,
        date:date
      }
      const res = await axios.post(
      `${import.meta.env.VITE_CS365_URI}/api/activity`,
      { field:'login',data:data }
    );
      
    } else {
       
      alert("Access denied");
      setLoading(false)
      await instance.logoutPopup({ postLogoutRedirectUri: "/" });
      instance.removeAccount(account);
      sessionStorage.clear();
    }
  } catch (error) {
    console.error("Login failed:", error);  }
};
 if(loading){
  return <div><ScaleLoading size={60}/></div>
 }
  return (
    <div className="rounded-xl bg-[var(--card)] text-[var(card-foreground)] shadow w-[350px]">
      <div className="bg-[var(--csblue)] p-4 rounded-lg rounded-b-none">
        <img alt="logo" src={logo} width={200} height={30} />
      </div>

      <div className="p-6 pt-0">
        <form>
          <div className="grid w-full items-center gap-4 pt-8">
            <div className="flex items-center">
              <Mail className="mr-2 h-4 w-4" />
              <Input
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                id="email"
                type="email"
                placeholder="user@consyst.biz"
                disabled
              />
            </div>
            <div className="flex items-center">
              <Lock className="mr-2 h-4 w-4" />
              <Input
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                id="password"
                type="password"
                placeholder="Enter your password"
                disabled
              />
            </div>
          </div>
        </form>
      </div>

      <div className="flex items-center p-6 pt-0 justify-center">
        <div className="flex flex-col items-center gap-4 hover:cursor-pointer">
          <Button
            className="bg-gray-200 text-black hover:bg-gray-200/90"
            disabled
          >
            Sign in
          </Button>

          <label className="text-gray-600">OR</label>

          <div
            className="flex justify-center items-center border border-[#8C8C8C] h-[41px]"
            onClick={handleLogin}
          >
            <img
              src={microsoftLogo}
              height={28}
              width={28}
              alt="Sign in with Microsoft 365"
              className="mr-3 ml-3"
            />
            <p className="mr-3 text-[15px] text-[#5E5E5E] font-semibold">
              Sign in with Microsoft 365
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInButton;
