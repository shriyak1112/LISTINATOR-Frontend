import React from "react";
import { styled } from "@mui/material/styles";

import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import { Menu } from "@mui/icons-material";
import ChecklistIcon from "@mui/icons-material/Checklist";

const Header = styled(AppBar)`
  z-index: 1201;
  background: wheat;
  height: 70px;
  box-shadow: inset 0 -1px 0 0 #dadce0;
`;

const Heading = styled(Typography)`
  color: black;
  font-size: 30px;
`;

const HeaderBar = ({ open, handleDrawer }) => {
  return (
    <Header open={open}>
      <Toolbar>
        <IconButton
          onClick={handleDrawer}
          edge="start"
          sx={{
            marginRight: "25px",
            color:"#121212",
          }}
        >
          <Menu />
        </IconButton>
        <ChecklistIcon style = {{color:"#121212"}} />
        <Heading style = {{color:"#121212"}}>LISTINATOR</Heading>
      </Toolbar>
    </Header>
  );
};

export default HeaderBar;
