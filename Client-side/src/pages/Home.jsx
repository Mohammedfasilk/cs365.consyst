// Home.jsx
import React, { useEffect, useState } from "react";
import {
  Mail,
  Cpu,
  Users,
  BarChart4,
  Calendar,
  FileText,
  Signature,
  CalendarCheck,
  HardDrive,
  Landmark,
  HelpCircle,
  Shield,
  Settings as SettingsIcon,
  ChevronRight,
  CheckCircle,
  AlertTriangle,
  Pin,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthRedirect } from "../Hooks/useAuthRoute";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/UI/Card";
import HorizontalCard from "../components/UI/HorizontalCard";
import VerticalCard from "../components/UI/VerticalCard";
import axios from "axios";

export default function Home() {
  useAuthRedirect();

  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  const temp = "23°C";
  const taskCount = 5;
  const [notices, setNotices] = useState([]);

  const items = [
    {
      Icon: Mail,
      title: "Microsoft 365",
      subtitle: "Email & Office Suite",
      path: "https://m365.cloud.microsoft/",
      bg: "bg-blue-100",
      fg: "text-blue-600",
    },
    {
      Icon: Cpu,
      title: "ERPNext",
      subtitle: "Enterprise Resource Planning",
      path: "https://erp.consyst.biz",
      bg: "bg-purple-100",
      fg: "text-purple-600",
    },
    {
      Icon: CalendarCheck,
      title: "Meeting Room Booking",
      subtitle: "Meeting Room Booking System",
      path: "https://booking.mysmartspace.in/",
      bg: "bg-red-100",
      fg: "text-red-600",
    },
    {
      Icon: Signature,
      title: "Email Signatures",
      subtitle: "Generate your Personalized email Signatures",
      path: "/business-tools/email-signatures",
      bg: "bg-green-100",
      fg: "text-green-600",
    },
    {
      Icon: Calendar,
      title: "Meeting Minutes",
      subtitle: "Record and Distribute Meeting Minutes",
      path: "/business-tools/meeting-minutes",
      bg: "bg-orange-100",
      fg: "text-orange-600",
    },
    {
      Icon: Users,
      title: "Odoo Recruitment",
      subtitle: "HR Applicant Shortlisting System",
      path: "https://consystgroup.odoo.com/web/login",
      bg: "bg-pink-100",
      fg: "text-pink-600",
    },
  ];

  const fetchNotice = async () => {
    try {
      // setLoading(true)
      const res = await axios.get(
        `${import.meta.env.VITE_CS365_URI}/api/notices`
      );

      const notices = res.data;
      setNotices(notices);
    } catch (error) {
      console.error("Error fetching  projects:", error);
    } finally {
      // setLoading(false)
    }
  };

  useEffect(() => {
    fetchNotice();
  }, []);

  return (
    <div className="max-w-[90%] mx-auto px-4 sm:px-6 py-8 m-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-6">
        <div className="flex-1">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-2">
            Welcome
            {/* <span className="text-[var(--csblue)]">Team</span> */}
          </h1>
          <p className="text-gray-600 mb-6 max-w-2xl">
            Ready to make today productive? Access all your tools and insights
            here.
          </p>
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-48 border border-gray-200 rounded-lg p-4 text-center bg-white shadow-sm">
          <div className="text-gray-800 font-semibold text-lg">{timeStr}</div>
          <div className="text-gray-500 text-sm mt-1">{dateStr}</div>
          <div className="text-gray-600 text-sm mt-3">{temp}</div>
          <Link
            to="/tasks"
            className="text-blue-600 text-sm font-semibold block mt-1 hover:underline flex items-center justify-center gap-1"
          >
          </Link>
        </div>
      </div>

      <hr className="border-gray-200 mb-6" />

      {/* Quick Access */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          Quick Access
        </h2>
        <p className="text-gray-500 mb-10 text-center">
          Jump straight to your most used business tools and applications
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {items.map(({ Icon, title, subtitle, path, bg, fg }) => (
            <Link to={path} key={title} className="group">
              <div className="p-4 border border-gray-200 rounded-lg h-full hover:border-blue-400 hover:shadow-sm transition-colors bg-white">
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className={`${bg} p-2 rounded-lg group-hover:bg-opacity-80 transition-colors`}
                  >
                    <Icon className={`${fg} w-5 h-5`} />
                  </div>
                  <h3 className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                    {title}
                  </h3>
                </div>
                <p className="text-sm text-gray-500 ml-11 group-hover:text-gray-700 transition-colors">
                  {subtitle}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <Card className="">
          <CardHeader className="py-10">
            <CardTitle className="flex items-center justify-center space-x-2">
              <Pin className="w-6 h-6 text-blue-500" />{" "}
              <h1 className="text-2xl font-bold">Digital Notice Board</h1>
            </CardTitle>
            <CardDescription className="text-center text-gray-500">
              Stay updated with the latest company announcements, events, and
              important notices
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
            {notices.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 py-10">
                No notices available.
              </div>
            ) : (
              notices.map((notice) =>
                notice.type === "Horizontal Card" ? (
                  <HorizontalCard key={notice._id} notice={notice} />
                ) : (
                  <VerticalCard key={notice._id} notice={notice} />
                )
              )
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
