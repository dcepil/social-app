import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {},
});

const Searchbar = () => {
  const classes = useStyles();
  return <div className={classes.root}></div>;
};

export default Searchbar;
