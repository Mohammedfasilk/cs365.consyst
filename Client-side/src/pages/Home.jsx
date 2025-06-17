import {
  ChartNoAxesCombined,
  DollarSign,
  FolderGit2,
  TableProperties,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthRedirect } from "../Hooks/useAuthRoute";

const AppIconButton = ({ title, icon, path, className }) => (
  <Link to={path}>
    <div className="flex flex-col items-center gap-2 group cursor-pointer">
      <div
        className={`w-24 h-24 rounded flex justify-center items-center cursor-pointer shadow group-hover:shadow-md group-hover:shadow-gray-500 transition-all hover:scale-105 ${className}`}
      >
        {icon}
      </div>
      <p className="drop-shadow max-w-[105px] overflow-clip text-center text-xs cursor-pointer">
        {title}
      </p>
    </div>
  </Link>
);

export default  function Home() {
  useAuthRedirect();
  return (
    <div className="w-full h-[100vh] justify-center bg-[var(--csgray)]">
      <div className="flex justify-center ml-24 pt-24 gap-12">
        <AppIconButton
          title="Dashboards"
          path="/dashboards/sales"
          className="bg-[#be6982]"
          icon={<ChartNoAxesCombined className="text-white w-12 h-12" />}
        />
        <AppIconButton
          title="Banking"
          path="/banking/axis-bank"
          className="bg-[#468c8c]"
          icon={<DollarSign className="text-white w-12 h-12" />}
        />
        <AppIconButton
          title="Project Management"
          path="/project-management/project"
          className="bg-[#7878a0]"
          icon={<FolderGit2 className="text-white w-12 h-12" />}
        />
        <AppIconButton
          title="Profit Workout"
          path="/coming-soon"
          className="bg-[#7878a0]"
          icon={<TableProperties className="text-white w-12 h-12" />}
        />
      </div>
    </div>
  );
}
