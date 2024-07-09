import * as React from "react";
import { styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import LogoutIcon from "@mui/icons-material/Logout";
import HeaderBar from "./HeaderBar";
import Navlist from "./Navlist";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useState,useContext } from "react";
import { DataContext } from "../context/DataProvider";
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const SwiperDrawer = () => {
  const [open, setOpen] = React.useState(true);

  const handleDrawer = () => {
    setOpen((prevState) => !prevState);
  };
  const {setNotes} = useContext(DataContext);

const navigate = useNavigate();
const handleLogout = () => {
  localStorage.clear();
  
  toast.success("Logging Out");
  setTimeout(() => {
    setNotes([]);
    navigate('/');
  }, 6000);
}
  return (
    <Box sx={{ display: "flex" }}>
      <ToastContainer toastStyle={{ backgroundColor: "#121212", color: "wheat" }} />
      <CssBaseline />
      <HeaderBar open={open} handleDrawer={handleDrawer} />
      <Drawer className="drawer" variant="permanent" open={open}>
        <DrawerHeader></DrawerHeader>
        <Navlist />
        <div className="flex-container-row logout-container" onClick={handleLogout}>
          <LogoutIcon className="flex-item logout-icon"></LogoutIcon>
          <p className="flex-item logout-text">Log Out</p>
        </div>
      </Drawer>
    </Box>
  );
};

export default SwiperDrawer;
// pasted