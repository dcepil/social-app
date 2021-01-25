import React, { useEffect } from "react";
import Header from "../../components/Header";
import FeedPostBox from "./FeedPostBox";
import Divider from "../../components/Divider";
import { makeStyles } from "@material-ui/core/styles";
import Post from "../../components/Post";
// import { useAuth } from "../../hooks/useAuth";
// import { useApi } from "../../hooks/useApi";

const useStyles = makeStyles({
  root: {
    flex: "0.7",
  },
});

const Feed = () => {
  const classes = useStyles();
  // const { call, setData } = useApi();
  // useEffect(() => {
  //   call({
  //     url: "http://localhost:3000/api/v1/users/testhandle1",
  //     callback: setData,
  //   });
  // }, [call, setData]);
  return (
    <div className={classes.root}>
      <Header title="Home" link="/home" />
      <FeedPostBox />
      <Divider />
      <Post
        name="Alk"
        handle="Alkaizerx"
        text="I love Path of Exile https://pathofexile.com/"
        media="https://cdn.discordapp.com/emojis/749795495332937819.png"
      />
      <Post
        name="Alk"
        handle="Alkaizerx"
        text="I love Path of Exile"
        media="https://media.discordapp.net/attachments/483348725704556557/789971151480684604/786926080556531732.gif"
      />
    </div>
  );
};

export default Feed;
