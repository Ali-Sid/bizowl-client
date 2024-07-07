import React from "react";

import { Icon, Text } from "@chakra-ui/react";
import {
  MdOutlineHomeRepairService,
  MdHome,
  MdLock,
  MdWork,
  // MdPerson,
  MdOutlineShoppingCart,
} from "react-icons/md";
import { GoProject } from "react-icons/go";
import { TiMessageTyping } from "react-icons/ti";
import { TbUserScan } from "react-icons/tb";
import { MdOutlineContactSupport } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/clintProfile";
import DataTables from "views/admin/dataTables";
import RTL from "views/admin/rtl";
import { RiVoiceRecognitionLine } from "react-icons/ri";

// Auth Imports
import SignInCentered from "views/auth/signIn";
import Project from "views/admin/project";
import Dashboard from "views/admin/dashboards";
import Recommendation from "views/admin/recommendation";
import Message from "views/admin/message";
import SignIn from "views/auth/signIn";
import Login from "components/Auth/Login";

const routes = [
  {
    // name: (
    //   <Text color="White">Dashboard</Text>
    // ),
    name:"Dashboard",
    layout: "/client",
    path: "/home",
    icon: <Icon as={MdHome} width='20px' height='20px'/>,
    component: Dashboard,
  },
  {
    name: "Projects",
    layout: "/client",
    path: "/project",
    icon: <Icon as={GoProject} width='20px' height='20px'/>,
    component: Project,
  },
  {
    name: "Services",
    layout: "/client",
    path: "/services",
    icon: (
      <Icon
        as={MdOutlineHomeRepairService}
        width='20px'
        height='20px'
      />
    ),
    component: NFTMarketplace,
    secondary: true,
  },
  {
    name: "Messages",
    layout: "/client",
    path: "/messages",
    icon: (
      <Icon
        as={TiMessageTyping }
        width='20px'
        height='20px'
      />
    ),
    component: Message,
    secondary: true,
  },
  {
    name: "Profile",
    layout: "/client",
    path: "/profile",
    icon: (
      <Icon
        as={TbUserScan}
        width='20px'
        height='20px'
      />
    ),
    component: Profile,
    secondary: true,
  },
  {
    name: "Recommendations",
    layout: "/client",
    path: "/recommendations",
    icon: (
      <Icon
        as={RiVoiceRecognitionLine}
        width='20px'
        height='20px'
      />
    ),
    component: Recommendation,
    secondary: true,
  },
  {
    name: "Support",
    layout: "/client",
    path: "/support",
    icon: (
      <Icon
        as={MdOutlineContactSupport}
        width='20px'
        height='20px'     
      />
    ),
    component: NFTMarketplace,
    secondary: true,
  },
  {
    name:"Logout",
    layout: "/auth",
    path: "/login",
    icon: (
      <Icon
        as={FiLogOut}
        width='20px'
        height='20px'
        // color='white'
      />
    ),
    component: Login,
    secondary: true,
  },
  

  
  // {
  //   name: "Bookings and Reservations",
  //   layout: "/client",
  //   icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
  //   path: "/data-tables",
  //   component: DataTables,
  // },
  // {
  //   name: "Profile",
  //   layout: "/admin",
  //   path: "/profile",
  //   icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
  //   component: Profile,
  // },
  // {
  //   name: "Sign In",
  //   layout: "/auth",
  //   path: "/sign-in",
  //   icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
  //   component: SignInCentered,
  // },
//  {
//     name: "RTL Admin",
//     layout: "/rtl",
//     path: "/rtl-default",
//     icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
//     component: RTL,
//   }, 
];

export default routes;
