import {
    CalendarClockIcon,
  CalendarCog,
  ChartNoAxesCombined,
  DollarSign,
  FolderGit2,
  Signature,
  TableProperties,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthRedirect } from "../../Hooks/useAuthRoute";
import { TfiMicrosoftAlt } from "react-icons/tfi";
import { ImProfile } from "react-icons/im";

const AppIconButton = ({ title, icon, path, className }) => (
  <Link to={path}>
    <div className="flex flex-col items-center gap-2 group cursor-pointer">
      <div
        className={`w-24 h-24 rounded flex justify-center items-center cursor-pointer shadow group-hover:shadow-md group-hover:shadow-gray-500 transition-all hover:scale-105 ${className}`}
      >
        {icon}
      </div>
      <p className="drop-shadow max-w-[105px] overflow-clip text-center text-sm cursor-pointer font-semibold text-gray-800">
        {title}
      </p>
    </div>
  </Link>
);

export default  function Tools() {
  useAuthRedirect();
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-[var(--csgray)]">
      <div className="flex justify-center ml-24 gap-16">
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
          icon={<ImProfile className="text-white w-12 h-12" />}
        />
        <AppIconButton
          title="Meeting Room Booking"
        //   path="/project-management/project"
          className="bg-[#7878a0]"
          icon={<CalendarClockIcon className="text-white w-12 h-12" />}
        />
      </div>
      <div className="flex justify-center ml-24 pt-10 gap-16">
               <AppIconButton
          title="Microsoft 365"
        //   path="/coming-soon"
          className="bg-[#204cb2]"
          icon={<TfiMicrosoftAlt className="text-white w-12 h-12" />}
        />
        <AppIconButton
          title="Email Signatures"
          path="/business-tools/email-signatures"
          className="bg-[#0c7a34]"
          icon={<Signature className="text-white w-12 h-12" />}
        />
        <AppIconButton
          title="Meeting Mangement"
          path="/business-tools/meeting-minutes"
          className="bg-[#696969]"
          icon={<CalendarCog className="text-white w-12 h-12" />}
        />
      </div>
    </div>
  );
}
