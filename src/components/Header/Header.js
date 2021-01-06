import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    position: "sticky",
    backgroundColor: "rgb(var(--colors-background))",
    top: "0",
    zIndex: "100",
    borderBottom: "1px solid rgba(var(--colors-border), 0.3)",
    padding: "15px",
    "& h2": {
      fontSize: "20px",
      fontWeight: "800",
    },
    "& h5": {
      fontWeight: "300",
      color: "rgb(var(--colors-border))",
    },
  },
});

const Header = ({ title, subtitle, link = "/" }) => {
  const classes = useStyles();
  return (
    <Link to={link}>
      <header className={classes.root}>
        <h2>{title}</h2>
        <h5>{subtitle}</h5>
      </header>
    </Link>
  );
};

export default Header;
