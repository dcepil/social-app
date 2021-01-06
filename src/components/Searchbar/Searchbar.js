import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "rgb(var(--colors-secondary))",
    borderRadius: "30px",
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
  },
  input: {
    fontWeight: "100",
    padding: "10px",
  },
  icon: {
    color: "rgb(var(--colors-border))",
  },
}));

const Searchbar = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <SearchIcon className={classes.icon} />
      <InputBase
        className={classes.input}
        fullWidth
        placeholder="Search..."
        inputProps={{ "aria-label": "search the application" }}
      />
    </div>
  );
};

export default Searchbar;
