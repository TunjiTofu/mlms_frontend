import {
  AssignmentIndOutlined,
  ClassOutlined,
  DashboardOutlined,
  PasswordOutlined,
  SettingsOutlined,
  SubjectOutlined,
} from "@mui/icons-material";

export const menuList = [
  {
    text: "Dashboard",
    icon: <DashboardOutlined color="primary" />,
    path: "/dashboardn",
  },
  {
    text: "Create Notes",
    icon: <ClassOutlined color="primary" />,
    path: "/create",
  },
  {
    text: "View Posts",
    icon: <SubjectOutlined color="primary" />,
    path: "/view-posts",
  },
];

export const menuListTeacher = [
  {
    text: "Dashboard",
    icon: <DashboardOutlined color="primary" />,
    path: "/dashboard",
  },
  {
    text: "Create Notes",
    icon: <ClassOutlined color="primary" />,
    path: "/create",
  },
  {
    text: "View Posts",
    icon: <SubjectOutlined color="primary" />,
    path: "/view-posts",
  },
  {
    text: "Quiz",
    icon: <SubjectOutlined color="primary" />,
    path: "/view-posts",
  },
];

export const appBarMenuList = [
  {
    text: "Profile",
    icon: <AssignmentIndOutlined />,
    path: "/dashboard",
  },
  {
    text: "Change Password",
    icon: <PasswordOutlined />,
    path: "/dashboard",
  },
  {
    text: "Settings",
    icon: <SettingsOutlined />,
    path: "/dashboard",
  },
  // {
  //   text: "Logout",
  //   icon: <LogoutOutlined/>,
  //   path: "/logout",
  // },
];
