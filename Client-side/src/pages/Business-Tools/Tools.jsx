import {
    CalendarClockIcon,
  ChartNoAxesCombined,
  DollarSign,
  FolderGit2,
  Signature,
  TableProperties,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthRedirect } from "../../Hooks/useAuthRoute";
import MicrosoftIcon from '@mui/icons-material/Microsoft';

const AppIconButton = ({ title, icon, path, className }) => (
  <Link to={path}>
    <div className="flex flex-col items-center gap-2 group cursor-pointer">
      <div
        className={`w-24 h-24 rounded flex justify-center items-center cursor-pointer shadow group-hover:shadow-md group-hover:shadow-gray-500 transition-all hover:scale-105 ${className}`}
      >
        {icon}
      </div>
      <p className="drop-shadow max-w-[105px] overflow-clip text-center text-sm cursor-pointer">
        {title}
      </p>
    </div>
  </Link>
);

export default  function Tools() {
  useAuthRedirect();
  return (
    <div className="w-full h-[100vh] justify-center bg-[var(--csgray)]">
      <div className="flex justify-center ml-24 pt-24 gap-12">
        <AppIconButton
          title="ERP Next"
        //   path="/dashboards/sales"
          className="bg-black"
          icon={<ChartNoAxesCombined className="text-white w-12 h-12" />}
        />
        <AppIconButton
          title="Odoo HR"
        //   path="/banking/axis-bank"
          className="bg-[#468c8c]"
          icon={<DollarSign className="text-white w-12 h-12" />}
        />
        <AppIconButton
          title="Meeting Room Booking"
        //   path="/project-management/project"
          className="bg-[#7878a0]"
          icon={<CalendarClockIcon className="text-white w-12 h-12" />}
        />
      </div>
      <div className="flex justify-center ml-24 pt-24 gap-12">
               <AppIconButton
          title="Microsoft 365"
          path="/coming-soon"
          className="bg-[#204cb2]"
          icon={<MicrosoftIcon className="text-white w-20 h-20" />}
        />
        <AppIconButton
          title="Email Signatures"
        //   path="/banking/axis-bank"
          className="bg-[#0c7a34]"
          icon={<Signature className="text-white w-12 h-12" />}
        />
        <AppIconButton
          title="Meeting Mangement"
        //   path="/project-management/project"
          className="bg-[#3e0034]"
          icon={<FolderGit2 className="text-white w-12 h-12" />}
        />
      </div>
    </div>
  );
}
