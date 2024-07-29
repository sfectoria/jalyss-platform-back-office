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
  },
  {
    title: "Users",
    icon: <GroupIcon />,
  },
  {
    title: "Employer",
    icon: <BadgeIcon />,
    children:[
      {
      title: "All Employers",
    // icon: <BadgeIcon />,
    link: "/employers",
    },
    {
      title: "Add Employer",
    // icon: <BadgeIcon />,
    link: "/employers/add-employer",
    }
  ]
  },
  {
    title: "Client",
    icon: <AssignmentIndIcon />,
    children:[
      {
      title: "All Clients",
    // icon: <BadgeIcon />,
    link: "/clients",
    },
    {
      title: "Add Client",
    // icon: <BadgeIcon />,
    link: "/clients/add-client",
    }
  ]  },
  {
    title: "Stock",
    icon: <WarehouseIcon />,
    link: "/stock",
  },
  {
    title: "Channels",
    icon: <HubIcon />,
  },
  {
    title: "Article",
    icon: <ForumIcon />,
    link: '/articles'
  },
  {
    title: "Fournisseur",
    icon: <BusinessIcon />,
  },
  {
    title: "Help",
    icon: <QuestionMarkIcon />,
  },
];
