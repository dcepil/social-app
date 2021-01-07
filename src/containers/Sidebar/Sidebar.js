import React from "react";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@material-ui/icons/Home";
import NotificationsIcon from "@material-ui/icons/NotificationsNone";
import MessagesIcon from "@material-ui/icons/MailOutline";
import ProfileIcon from "@material-ui/icons/PermIdentity";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    flex: "0.2",
    borderRight: "1px solid rgba(var(--colors-border), 0.3)",
    padding: "0 30px",
    paddingTop: "10px",
    height: "100%",
    "& .active": {
      color: "rgb(var(--colors-primary))",
    },
  },
  sidebarButton: {
    backgroundColor: "rgb(var(--colors-primary))",
    border: "none",
    fontWeight: "600",
    textTransform: "inherit",
    borderRadius: "30px",
    height: "48px",
    fontSize: "15px",
    marginTop: "20px",
    transition: "color 200ms, background-color 200ms ease-out",
    "&:hover": {
      backgroundColor: "rgba(var(--colors-primary), 0.7)",
    },
  },
});

const Sidebar = () => {
  const classes = useStyles();
  return (
    <nav className={classes.root}>
      <NavLink exact to="/">
        <SidebarOption Icon={HomeIcon} text="Home" />
      </NavLink>
      <NavLink to="/notifications">
        <SidebarOption Icon={NotificationsIcon} text="Notifications" />
      </NavLink>
      {/* <NavLink to="/messages">
        <SidebarOption Icon={MessagesIcon} text="Messages" />
      </NavLink> */}
      <NavLink to="/profile">
        <SidebarOption Icon={ProfileIcon} text="Profile" />
      </NavLink>

      <Button className={classes.sidebarButton} variant="outlined" fullWidth>
        Post
      </Button>
    </nav>
  );
};

export default Sidebar;
