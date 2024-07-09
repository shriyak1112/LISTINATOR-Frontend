import React, { useContext, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ArchiveIcon from "@mui/icons-material/Archive";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { Link } from "react-router-dom";
import DeleteOutlineSharpIcon from "@mui/icons-material/DeleteOutlineSharp";
import { DataContext } from "../context/DataProvider";

const Navlist = () => {
  const { setShowDelete, setShowRem, showDelete, showRem } = useContext(DataContext);
  const handleShowDeletet = () => {
    setShowDelete(true);
  };
  const handleShowDeletef = () => {
    setShowDelete(false);
  };
  const handleShowRemt = () => {
    setShowRem(true);
  };
  const handleShowRemf = () => {
    setShowRem(false);
  };

  useEffect(() => {
    localStorage.setItem("showDelete", showDelete);
    localStorage.setItem("showRem", showRem);
  }, [showDelete, showRem]);

  const navList = [
    { id: 1, name: "Notes", icon: <EditNoteIcon style={{ color: "wheat" }} />, route: "/createtodo/notes", onClick: () => { handleShowDeletef(); handleShowRemt(); } },
    { id: 2, name: "Archive", icon: <ArchiveIcon style={{ color: "wheat" }} />, route: "/createtodo/archive", onClick: () => { handleShowDeletef(); handleShowRemf(); } },
    { id: 3, name: "Reminder", icon: <NotificationsActiveIcon style={{ color: "wheat" }} />, route: "/createtodo/reminder", onClick: () => { handleShowDeletef(); handleShowRemf(); } },
    {
      id: 4,
      name: "Delete",
      icon: <DeleteOutlineSharpIcon style={{ color: "wheat" }} />,
      route: "/createtodo/delete",
      onClick: () => { handleShowDeletet(); handleShowRemf(); },
    },
  ];

  return (
    <List style={{ background: "#121212" }}>      {navList.map((list) => (
      <ListItem key={list.id}>
        <Link
          to={list.route}
          style={{
            textDecoration: "none",
            display: "flex",
            color: "inherit",
          }}
          onClick={list.onClick}
        >
          <ListItemIcon style={{ alignItems: "center" }}>
            {list.icon}
          </ListItemIcon>
          <ListItemText primary={list.name} />
        </Link>
      </ListItem>
    ))}
    </List>
  );
};

export default Navlist;
