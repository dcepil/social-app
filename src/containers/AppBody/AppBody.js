import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    display: "flex",
    height: "100vh",
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: "1300px",
    padding: "0 10px",
  },
}));

const AppBody = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.root}>{children}</div>;
};

export default AppBody;
