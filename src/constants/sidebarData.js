import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import BadgeIcon from "@mui/icons-material/Badge";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import HubIcon from "@mui/icons-material/Hub";
import ForumIcon from "@mui/icons-material/Forum";
import BusinessIcon from "@mui/icons-material/Business";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

export const sidebarData = [
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
    children: [
      {
        title: "Line Chart",
        // icon: <BadgeIcon />,
        link: "/dashboard",
      },
      {
        title: "Bump Chart",
        // icon: <BadgeIcon />,
        link: "/dashboard/bump",
      },
    ],
  },
  {
    title: "Users",
    icon: <GroupIcon />,
  },
  {
    title: "Employee",
    icon: <BadgeIcon />,
    children: [
      {
        title: "All Employees",
        // icon: <BadgeIcon />,
        link: "/employees",
      },
      {
        title: "Add Employee",
        // icon: <BadgeIcon />,
        link: "/employees/add-employee",
      },
    ],
  },
  {
    title: "Client",
    icon: <AssignmentIndIcon />,
    children: [
      {
        title: "All Clients",
        // icon: <BadgeIcon />,
        link: "/clients",
      },
      {
        title: "Add Client",
        // icon: <BadgeIcon />,
        link: "/clients/add-client",
      },
    ],
  },
  {
    title: "Stock",
    icon: <WarehouseIcon />,
    children: [
      {
        title: "All Stocks",
        link: "/stock",
      },
      {
        title: "Add Stock",
        link: "/stock/add-stock",
      },
    ],
  },
  {
    title: "Channels",
    icon: <HubIcon />,
  },
  {
    title: "Article",
    icon: <ForumIcon />,
    link: "/articles",
  },
  {
    title: "Fournisseur",
    icon: <BusinessIcon />,
    children: [
      {
        title: "All Fournisseurs",
        link: "/fournisseurs",
      },
      {
        title: "Add Fournisseur",
        link: "/fournisseurs/add-fournisseur",
      },
    ],
  },
  {
    title: "Help",
    icon: <QuestionMarkIcon />,
  },
];
