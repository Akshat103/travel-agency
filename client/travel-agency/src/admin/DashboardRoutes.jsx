import AdminHome from "./pages/AdminHome";

const DashboardRoutes = [
  {
    path: "/",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: AdminHome,
    layout: "/admin"
  },
  {
    path: "/orders",
    name: "Orders",
    icon: "nc-icon nc-chart-pie-35",
    // component: AdminHome,
    layout: "/admin"
  }
];

export default DashboardRoutes;
