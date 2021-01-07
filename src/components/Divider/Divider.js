import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    minHeight: "10px",
    borderBottom: "1px solid rgba(var(--colors-border), 0.3)",
    backgroundColor: "rgba(var(--colors-secondary), 0.2)",
  },
});

const Divider = () => {
  const classes = useStyles();
  return <div className={classes.root}></div>;
};

export default Divider;
