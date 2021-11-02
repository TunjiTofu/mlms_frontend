import { ClassOutlined, DashboardOutlined, SubjectOutlined } from "@mui/icons-material";

export const menuList = [
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
];