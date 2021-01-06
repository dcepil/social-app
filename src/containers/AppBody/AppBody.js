import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flex: "0.8",
    overflowY: "scroll",
    msOverflowStyle: "none",
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
}));

const AppBody = ({ children }) => {
  const classes = useStyles();
  return <main className={classes.root}>{children}</main>;
};

export default AppBody;
