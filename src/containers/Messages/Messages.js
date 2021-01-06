import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Header from "../../components/Header";

const useStyles = makeStyles({
  root: {
    flex: "0.7",
  },
});

const Messages = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Header title="Messages" link="/messages" />
    </div>
  );
};

export default Messages;
