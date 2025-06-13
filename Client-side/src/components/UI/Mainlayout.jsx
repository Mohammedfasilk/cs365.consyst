import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Navbar />
        <div>
          <Outlet /> {/* This will render nested routes */}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
