import { useAuthRedirect } from "../../Hooks/useAuthRoute";

function Finance() {
  useAuthRedirect();

  return (
    <div className="flex justify-center items-center h-screen w-full">
      finance
    </div>
  );
}

export default Finance;
