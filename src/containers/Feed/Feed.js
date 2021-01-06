import React from "react";
import Header from "../../components/Header";
import FeedPostBox from "./FeedPostBox";
import FeedDivider from "./FeedDivider";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    flex: "0.7",
  },
});

const Feed = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Header title="Home" link="/" />
      <FeedPostBox />
      <FeedDivider />
    </div>
  );
};

export default Feed;
