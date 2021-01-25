import React from "react";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@material-ui/icons/Home";
// import NotificationsIcon from "@material-ui/icons/NotificationsNone";
// import MessagesIcon from "@material-ui/icons/MailOutline";
import ProfileIcon from "@material-ui/icons/PermIdentity";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useApi } from "../../hooks/useApi";

const useStyles = makeStyles({
  root: {
    flex: "0.2",
    display: "flex",
    flexDirection: "column",
    borderRight: "1px solid rgba(var(--colors-border), 0.3)",
    padding: "0 30px",
    paddingTop: "10px",
    height: "100%",
    "& .active": {
      color: "rgb(var(--colors-primary))",
    },
  },
  button: {
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
  logoutButton: {
    marginTop: "auto",
    marginBottom: "20px",
  },
});

const Sidebar = () => {
  const classes = useStyles();
  const history = useHistory();
  const auth = useAuth();
  const { state } = useApi();
  const logout = async () => {
    await auth.logout();
    return history.push("/login");
  };
  return state.user ? (
    <nav className={classes.root}>
      <NavLink exact to="/">
        <SidebarOption Icon={HomeIcon} text="Home" />
      </NavLink>
      <NavLink to="/profile">
        <SidebarOption Icon={ProfileIcon} text="Profile" />
      </NavLink>
      {/* <Button className={classes.button} variant="outlined" fullWidth>
        Post
      </Button> */}
      <Button
        className={`${classes.button} ${classes.logoutButton}`}
        variant="outlined"
        fullWidth
        onClick={logout}
      >
        Logout
      </Button>
    </nav>
  ) : (
    <nav className={classes.root}></nav>
  );
};

export default Sidebar;
