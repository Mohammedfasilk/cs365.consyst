import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChartNoAxesCombined,
  DollarSign,
  FolderGit2Icon,
  SignatureIcon,
} from "lucide-react";
import { SettingsSheet } from "../Settings/settings-sheet";
// import { ModeToggle } from "@/components/ModeToggle"; // Assuming it's the same or converted to React
// import { SettingsSheet } from "@/components/settings/settings-sheet"; // Assuming it's the same or converted to React
// import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"; // Assuming it's the same or converted to React

// Simulated authentication state (You can replace with real auth logic like MSAL or Firebase)
// const simulatedSession = { user: { roles: ["admin"] } }; // Example of session object, replace with real session management

export default function Sidebar() {
  const [isHovered, setIsHovered] = useState(false);
  const Currentuser = JSON.parse(sessionStorage.getItem("user"));

  const menuItems = [
    {
      icon: <ChartNoAxesCombined className="h-5 w-5" />,
      label: "Dashboards",
      href: "#",
      subItems: [
        { label: "Sales", href: "/dashboards/sales" },
        { label: "Finance", href: "/dashboards/finance" },
        { label: "Project", href: "/dashboards/project-report" },
      ],
    },
    {
      icon: <DollarSign className="h-5 w-5" />,
      label: "Banking",
      href: "#",
      subItems: [
        { label: "Axis Bank", href: "/banking/axis-bank" },
        { label: "HDFC Bank", href: "/banking/hdfc-bank" },
        { label: "ICICI Bank", href: "/banking/icici-bank" },
        { label: "RAK Bank", href: "/banking/rak-bank" },
      ],
    },
    {
      icon: <FolderGit2Icon className="h-5 w-5" />,
      label: "Project Management",
      href: "#",
      subItems: [
        { label: "Project", href: "/project-management/project" },
        { label: "Cost Control", href: "/project-management/cost-control" },
        { label: "Schedule", href: "/project-management/schedule" },
      ],
    },
    {
      icon: <SignatureIcon className="h-5 w-5" />,
      label: "Signature Management",
      href: "#",
      subItems: [
        { label: "Signatures", href: "/signature-management/signatures" },
      ],
    },
  ];

  return (
    <div
      className={`z-50 fixed top-12 h-[calc(100vh-48px)] flex max-h-screen ${
        isHovered ? "w-64" : "w-14"
      } flex-col border-r bg-[var(--background)] transition-all duration-300`}
    >
      <nav
        className="flex-1 overflow-x-hidden py-4 overflow-y-auto"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <ul className="grid gap-4 px-2 transition-all">
          {menuItems.map((item, index) => (
            <li key={index}>
              <div className={`${isHovered ? "h-auto" : "h-10"} max-h`}>
                <Link
                  to={item.href}
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground ${
                    isHovered ? "justify-start" : ""
                  }`}
                >
                  {item.icon}
                  <span
                    className={`whitespace-nowrap ${
                      isHovered ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
                {item.subItems && (
                  <ul
                    className={`ml-8 mt-1 space-y-1 transition-opacity duration-500 ${
                      isHovered ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                  >
                    {item.subItems.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <Link
                          to={subItem.href}
                          className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                          {subItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>
      </nav>
      <div
        className={`flex ${
          !isHovered
            ? "flex-col justify-center"
            : "flex-row justify-start ml-4 "
        }  items-center py-4 gap-2  mt-auto border-t`}
      >
        {/* <div>
              <ModeToggle/>
            </div>
            <p>Toggle Mode</p> */}
        {Currentuser?.roles.includes("admin") ? (
          <div>
            <SettingsSheet />
          </div>
        ) : null}
      </div>
    </div>
  );
}
