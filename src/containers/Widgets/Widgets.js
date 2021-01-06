import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Searchbar from "../../components/Searchbar";

const useStyles = makeStyles({
  root: {
    flex: "0.3",
    borderLeft: "1px solid rgba(var(--colors-border), 0.3)",
    padding: "0 30px",
    paddingTop: "10px",
  },
});

const Widgets = () => {
  const classes = useStyles();
  return (
    <aside className={classes.root}>
      <Searchbar />
    </aside>
  );
};

export default Widgets;
