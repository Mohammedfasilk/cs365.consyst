import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BriefcaseBusiness,
  ChartNoAxesCombined,
  Clipboard,
  DollarSign,
  FolderGit2Icon,
  SignatureIcon,
} from "lucide-react";
import { SettingsSheet } from "../Settings/settings-sheet";
import { useSessionRole } from "../../Hooks/useSessionRole";
import axios from "axios";
import { useMsal } from "@azure/msal-react";

export default function Sidebar() {
  const { accounts } = useMsal();
  const currentEmail = accounts[0]?.username;
  const [isHovered, setIsHovered] = useState(false);
    const [userRole, setUserRoles] = useState([]);

 useEffect(() => {
  const fetchUser = async () => {
    if (!currentEmail) return;

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_CS365_URI}/api/user/session-user`,
        { email: currentEmail },
      );

      const userData = res.data;
      setUserRoles(userData.roles || []);
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setUserRoles([]);
    }
  };

  fetchUser();
}, [currentEmail]);
  const menuItems = [
    {
      icon: <ChartNoAxesCombined className="h-5 w-5" />,
      label: "Sales",
      href: "#",
      subItems: [
        { label: "Sales Dashboard", href: "/Sales/sales-dashboard" },
        { label: "Order Booking", href: "/Sales/order-booking" },
      ],
    },
    {
      icon: <DollarSign className="h-5 w-5" />,
      label: "Finance",
      href: "#",
      subItems: [
        { label: "Finance Dashboard", href: "/Finance/finance-dashboard" },
        // { label: "Banking", href: "/Finance/Banking" },
        { label: "Billing Plan", href: "/Finance/billing-plan" },
      ],
    },
    {
      icon: <FolderGit2Icon className="h-5 w-5" />,
      label: "Project Management",
      href: "#",
      subItems: [
        { label: "Project Dashboard", href: "/project-management/project-dashboard" },
        { label: "Project", href: "/project-management/project" },
        { label: "Cost Control", href: "/project-management/cost-control" },
        { label: "Schedule Update", href: "/project-management/schedule" },
      ],
    },
  ];

const allowedMenuItems = [
   {
      icon: <Clipboard className="h-5 w-5" />,
      label: "Digital Notice Board",
      href: "/business-tools/notice",
      subItems: [],
    },
];

menuItems.forEach((item) => {
  if (userRole.includes("admin")) {
    allowedMenuItems.push(item);
    return;
  }

  switch (item.label) {
    case "Sales":
      if (userRole.includes("sales-user") || userRole.includes("sales-manager")) {
        allowedMenuItems.push(item);
      }
      break;
    case "Finance":
      if (userRole.includes("finance-user") || userRole.includes("finance-manager")) {
        allowedMenuItems.push(item);
      }
      break;
    case "Project Management":
      if (userRole.includes("project-user") || userRole.includes("project-manager")) {
        allowedMenuItems.push(item);
      }
      break;
    default:
      // Do nothing
      break;
  }
});


  return (
    <div
      className={`z-50 fixed top-12 h-[calc(100vh-48px)] flex max-h-screen ${isHovered ? "w-64" : "w-14"
        } flex-col border-r bg-[var(--background)] transition-all duration-300`}
    >
      <nav
        className="flex-1 overflow-x-hidden py-4 overflow-y-auto"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <ul className="grid gap-4 px-2 transition-all">
          {allowedMenuItems.map((item, index) => (
            <li key={index}>
              <div className={`${isHovered ? "h-auto" : "h-10"} max-h`}>
                <Link
                  to={item.href}
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-base font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground ${isHovered ? "justify-start" : ""
                    }`}
                >
                  {item.icon}
                  <span
                    className={`whitespace-nowrap ${isHovered ? "opacity-100 visible" : "opacity-0 invisible"
                      }`}
                  >
                    {item.label}
                  </span>
                </Link>
                {item.subItems && (
                  <ul
                    className={`ml-8 mt-1 space-y-1 transition-opacity duration-500 ${isHovered ? "opacity-100 visible" : "opacity-0 invisible"
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
        className={`flex ${!isHovered
          ? "flex-col justify-center"
          : "flex-row justify-start ml-4 "
          }  items-center py-4 gap-2  mt-auto border-t`}
      >
        {userRole.includes("admin") ? (
          <div>
            <SettingsSheet />
          </div>
        ) : null}
      </div>
    </div>
  );
}
