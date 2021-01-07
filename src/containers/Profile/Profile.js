import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Header from "../../components/Header";
import ProfileHeader from "./ProfileHeader";
import Post from "../../components/Post";
import Divider from "../../components/Divider";

const useStyles = makeStyles({
  root: {
    flex: "0.7",
  },
});

const Profile = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Header title="Profile" link="/profile" />
      <ProfileHeader
        name="Alk"
        handle="Alkaizerx"
        description="I kiss Path of Exile on the lips!"
        link="https://pathofexile.com/"
        birthday="September 12, 1923"
        joined="December 2011"
      />
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
      <Post
        name="Alk"
        handle="Alkaizerx"
        text="I love Path of Exile"
        media="https://cdn.discordapp.com/emojis/749795495332937819.png"
      />
      <Post
        name="Alk"
        handle="Alkaizerx"
        text="I love Path of Exile"
        media="https://cdn.discordapp.com/emojis/749795495332937819.png"
      />
      <Post
        name="Alk"
        handle="Alkaizerx"
        text="I love Path of Exile"
        media="https://cdn.discordapp.com/emojis/749795495332937819.png"
      />
      <Post
        name="Alk"
        handle="Alkaizerx"
        text="I love Path of Exile"
        media="https://cdn.discordapp.com/emojis/749795495332937819.png"
      />
      <Post
        name="Alk"
        handle="Alkaizerx"
        text="I love Path of Exile"
        media="https://cdn.discordapp.com/emojis/749795495332937819.png"
      />
      <Post
        name="Alk"
        handle="Alkaizerx"
        text="I love Path of Exile"
        media="https://cdn.discordapp.com/emojis/749795495332937819.png"
      />
    </div>
  );
};

export default Profile;
