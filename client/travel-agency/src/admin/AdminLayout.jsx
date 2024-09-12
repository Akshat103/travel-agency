import React, { useEffect, useRef, useState } from 'react'
import { Route, useLocation, Routes } from 'react-router-dom';
// import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/animate.min.css";
import "../assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
// import "@fortawesome/fontawesome-free/css/all.min.css";
import sidebarImage from "../assets/img/sidebar-3.jpg";
import Sidebar from './components/Sidebar';
import AdminNavbar from './components/AdminNavbar';
import Footer from './components/Footer';
import DashboardRoutes from './DashboardRoutes'

const AdminLayout = () => {
    const [image, setImage] = useState(sidebarImage);
    const [color, setColor] = useState("black");
    const [hasImage, setHasImage] = useState(true);
    const location = useLocation();
    const mainPanel = useRef(null);
    const getRoutes = (DashboardRoutes) => {
        return DashboardRoutes.map((prop, key) => {
            if (prop.layout === "/admin") {
                return (
                    <Route
                        path={prop.layout + prop.path}
                        render={(props) => <prop.component {...props} />}
                        key={key}
                    />
                );
            } else {
                return null;
            }
        });
    };
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
                    <AdminNavbar/>
                    <div className="content">
                        <Routes>{getRoutes(DashboardRoutes)}</Routes>
                    </div>
                    <Footer />
                </div>
            </div>
            {/* <FixedPlugin
                hasImage={hasImage}
                setHasImage={() => setHasImage(!hasImage)}
                color={color}
                setColor={(color) => setColor(color)}
                image={image}
                setImage={(image) => setImage(image)}
            /> */}
        </>
    )
}

export default AdminLayout
