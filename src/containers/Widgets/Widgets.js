import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    flex: "0.3",
    borderLeft: "1px solid rgba(var(--colors-border), 0.3)",
  },
});

const Widgets = () => {
  const classes = useStyles();
  return <aside className={classes.root}></aside>;
};

export default Widgets;
