import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import BadgeIcon from "@mui/icons-material/Badge";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import HubIcon from "@mui/icons-material/Hub";
import ForumIcon from "@mui/icons-material/Forum";
import BusinessIcon from "@mui/icons-material/Business";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import SvgBumpChartIcon from "../icons/BumpChartIcon";
import ViewCompactIcon from "@mui/icons-material/ViewCompact";
import ListIcon from "@mui/icons-material/List";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

export const sidebarData = [
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
    children: [
      {
        title: "Line Chart",
        icon: <ShowChartIcon />,
        link: "/",
      },
      {
        title: "Bump Chart",
        icon: <SvgBumpChartIcon />,
        link: "/bump",
      },
      {
        title: "Calendar Chart",
        link: "/calendar",
        icon: <ViewCompactIcon />,
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
        icon: <ListIcon />,
        link: "/employees",
      },
      {
        title: "Add Employee",
        icon: <PlaylistAddIcon />,
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
        icon: <ListIcon />,
        link: "/clients",
      },
      {
        title: "Add Client",
        icon: <PlaylistAddIcon />,
        link: "/clients/add-client",
      },
    ],
  },
  {
    title: "Achat",
    icon: <WarehouseIcon />,
    children: [
      {
        title: "Achat List",
        icon: <ListIcon />,
        link: "/sales",
      },
      {
        title: "Add Achat",
        icon: <PlaylistAddIcon />,
        link: "/sales/add-sale",
      },
    ],
  },
  {
    title: "Vente",
    icon: <WarehouseIcon />,
    children: [
      {
        title: "Vente List",
        icon: <ListIcon />,
        link: "/vente",
      },
      {
        title: "Add Vente",
        icon: <PlaylistAddIcon />,
        link: "/vente/add-vente",
      },
    ],
  },
  {
    title: "Stock",
    icon: <WarehouseIcon />,
    children: [
      {
        title: "All Stocks",
        icon: <ListIcon />,
        link: "/stock",
      },
      {
        title: "Add Stock",
        icon: <PlaylistAddIcon />,
        link: "/stock/add-stock",
      },
    ],
  },
  {
    title: "Channels",
    icon: <HubIcon />,
    children: [
      {
        title: "All Channels",
        icon: <ListIcon />,
        link: "/channels",
      },
      {
        title: "Add Channel",
        icon: <PlaylistAddIcon />,
        link: "/channels/add-channel",
      },
    ],
  },
  {
    title: "Article",
    icon: <ForumIcon />,
    children: [
      {
        title: "All Articles",
        icon: <ListIcon />,
        link: "/articles",
      },
      {
        title: "Add Article",
        icon: <PlaylistAddIcon />,
        link: "/articles/new-article",
      },
    ],
  },
  {
    title: "Fournisseur",
    icon: <BusinessIcon />,
    children: [
      {
        title: "All Fournisseurs",
        icon: <ListIcon />,
        link: "/fournisseurs",
      },
      {
        title: "Add Fournisseur",
        icon: <PlaylistAddIcon />,
        link: "/fournisseurs/add-fournisseur",
      },
    ],
  },
  {
    title: "Help",
    icon: <QuestionMarkIcon />,
  },
];
