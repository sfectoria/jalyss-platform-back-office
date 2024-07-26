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
    link: "/employers",
  },
  {
    title: "Client",
    icon: <AssignmentIndIcon />,
    link: "/clients",
  },
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
