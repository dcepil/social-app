import React from "react";
import Header from "../../components/Header";
import FeedPostBox from "./FeedPostBox";
import FeedDivider from "./FeedDivider";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    flex: "0.5",
    overflowY: "scroll",
    msOverflowStyle: "none",
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
});

const Feed = () => {
  const classes = useStyles();
  return (
    <main className={classes.root}>
      <Header title="Home" link="/" />
      <FeedPostBox />
      <FeedDivider />
    </main>
  );
};

export default Feed;
