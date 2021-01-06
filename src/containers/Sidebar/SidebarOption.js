import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  sidebarOption: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    padding: "15px",
    transition: "color 200ms, background-color 200ms ease-out",
    borderRadius: "30px",
    "&:hover": {
      backgroundColor: "rgba(var(--colors-primary), 0.2)",
      color: "rgb(var(--colors-primary))",
    },
    "& h2": {
      fontWeight: "600",
      fontSize: "20px",
      marginRight: "20px",
    },
    "& .MuiSvgIcon-root": {
      marginRight: "20px",
      fontSize: "30px",
    },
  },
});

const SidebarOption = ({ text, Icon }) => {
  const classes = useStyles();
  return (
    <div className={classes.sidebarOption}>
      <Icon />
      <h2>{text}</h2>
    </div>
  );
};

export default SidebarOption;
