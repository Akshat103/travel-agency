import React, { useEffect, useRef, useState } from 'react'
import { useLocation, Outlet } from 'react-router-dom';
import "../assets/css/animate.min.css";
import "../assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import sidebarImage from "../assets/img/sidebar.jpg";
import Sidebar from './components/Sidebar';
import AdminNavbar from './components/AdminNavbar';
import DashboardRoutes from './DashboardRoutes'

const AdminLayout = () => {
  const [image, setImage] = useState(sidebarImage);
  const [color, setColor] = useState("black");
  const [hasImage, setHasImage] = useState(true);
  const location = useLocation();
  const mainPanel = useRef(null);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainPanel.current.scrollTop = 0;
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      var element = document.getElementById("bodyClick");
      element.parentNode.removeChild(element);
    }
  }, [location]);

  return (
    <>
      <div className="wrapper">
        <Sidebar color={color} image={hasImage ? image : ""} DashboardRoutes={DashboardRoutes} />
        <div className="main-panel" ref={mainPanel}>
          <AdminNavbar />
          <div className="content">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminLayout