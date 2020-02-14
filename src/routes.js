import Dashboard from "views/Dashboard.jsx";
import Notifications from "views/Notifications.jsx";
import Icons from "views/Icons.jsx";
import Typography from "views/Typography.jsx";
import TableList from "views/Tables.jsx";
import Maps from "views/Map.jsx";
import UserPage from "views/User.jsx";
import UpgradeToPro from "views/Upgrade.jsx";
import Login from "views/Login";
import AddStore from "views/AddStore";
import Allstore from "views/Allstores";
import AddproductCategory from "views/AddProductCategory";
var routes = [
  {
    path: "/login",
    // name: "Login",
    icon: "nc-icon nc-bank",
    component: Login,
    layout: "/admin",
    isSidebarHeader: false
  },
  {
    path: "/addStore",
    name: "Add Store",
    icon: "nc-icon nc-bank",
    component: AddStore,
    layout: "/admin",
    isSidebarHeader: false
  },
  {
    path: "/icons",
    name: "ALL PRODUCTS",
    icon: "nc-icon nc-diamond",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/addProducts",
    name: "Add Products",
    icon: "nc-icon nc-simple-add",
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/allStores",
    name: "All Stores",
    icon: "nc-icon nc-simple-add",
    component: Allstore,
    layout: "/admin"
  },
  {
    path: "/addProductCategory",
    name: "Add Products Category",
    icon: "nc-icon nc-single-02",
    component: AddproductCategory,
    layout: "/admin"
  },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "nc-icon nc-bell-5  5",
  //   component: Notifications,
  //   layout: "/admin"
  // },
  {
    path: "/orders",
    name: "Orders",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/admin"
  }
  // {
  //   path: "/tables",
  //   name: "Table List",
  //   icon: "nc-icon nc-tile-56",
  //   component: TableList,
  //   layout: "/admin"
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "nc-icon nc-caps-small",
  //   component: Typography,
  //   layout: "/admin"
  // },
  // {
  //   pro: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "nc-icon nc-spaceship",
  //   component: UpgradeToPro,
  //   layout: "/admin"
  // }
];
export default routes;
