import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    color: "rgb(var(--colors-primary))",
    width: "fit-content",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    padding: "8px",
    transition: "background-color 200ms ease-out",
    borderRadius: "30px",
    "&:hover": {
      backgroundColor: "rgba(var(--colors-primary), 0.2)",
    },
    "& .MuiSvgIcon-root": {
      fontSize: "22px",
    },
  },
});

const FeedPostBoxOption = ({ Icon }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Icon />
    </div>
  );
};

export default FeedPostBoxOption;
