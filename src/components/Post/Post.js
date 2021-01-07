import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, IconButton } from "@material-ui/core";
import CommentIcon from "@material-ui/icons/ModeCommentOutlined";
import RepostIcon from "@material-ui/icons/Repeat";
import LikeIcon from "@material-ui/icons/FavoriteBorder";
import ShareIcon from "@material-ui/icons/ShareOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    borderBottom: "1px solid rgba(var(--colors-border), 0.3)",
  },
  avatarDiv: {
    padding: "10px 0",
    paddingLeft: "10px",
  },
  body: {
    flex: "1",
    padding: "10px 0",
    "& img": {
      borderRadius: "20px",
    },
  },
  postOptions: {
    display: "flex",
    paddingLeft: "5px",
  },
  headerBody: {
    marginBottom: "10px",
    fontSize: "15px",
  },
  headerText: {
    display: "flex",
    alignItems: "center",
    "& h3": {
      fontSize: "15px",
      marginBottom: "5px",
    },
  },
  headerHandle: {
    fontWeight: "300",
    color: "rgb(var(--colors-border))",
    padding: "0 5px",
  },
  mediaDiv: {
    paddingLeft: "12px",
    "& img": {
      border: "1px solid rgba(var(--colors-border), 0.3)",
    },
  },
  iconButton: {
    color: "rgb(var(--colors-border))",
    padding: "6px",
    transition: "color 200ms, background-color 200ms ease-out",
    borderRadius: "30px",
    marginRight: theme.spacing(4),
    "& .MuiSvgIcon-root": {
      fontSize: "18px",
    },
  },
  header: {
    paddingLeft: "10px",
  },
  optionSpan: {
    fontSize: "12px",
    paddingLeft: "5px",
  },
  commentButton: {
    "&:hover": {
      backgroundColor: "rgba(var(--colors-comment), 0.2)",
      color: "rgb(var(--colors-comment))",
    },
  },
  repostButton: {
    "&:hover": {
      backgroundColor: "rgba(var(--colors-repost), 0.2)",
      color: "rgb(var(--colors-repost))",
    },
  },
  likeButton: {
    "&:hover": {
      backgroundColor: "rgba(var(--colors-like), 0.2)",
      color: "rgb(var(--colors-like))",
    },
  },
  shareButton: {
    "&:hover": {
      backgroundColor: "rgba(var(--colors-comment), 0.2)",
      color: "rgb(var(--colors-comment))",
    },
  },
  headerName: {
    fontWeight: "800",
  },
}));

const Post = ({ name, handle, text, media, avatar }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.avatarDiv}>
        <Avatar src={avatar} />
      </div>
      <div className={classes.body}>
        <div className={classes.header}>
          <div className={classes.headerText}>
            <span className={classes.headerName}>{name}</span>
            <span className={classes.headerHandle}>@{handle}</span>
          </div>
          <div className={classes.headerBody}>
            <p>{text}</p>
          </div>
        </div>
        <div className={classes.mediaDiv}>
          <img src={media} alt="post media" />
        </div>
        <div className={classes.postOptions}>
          <IconButton
            className={`${classes.iconButton} ${classes.commentButton}`}
          >
            <CommentIcon />
            <span className={classes.optionSpan}>12</span>
          </IconButton>
          <IconButton
            className={`${classes.iconButton} ${classes.repostButton}`}
          >
            <RepostIcon />
            <span className={classes.optionSpan}>10</span>
          </IconButton>
          <IconButton className={`${classes.iconButton} ${classes.likeButton}`}>
            <LikeIcon />
            <span className={classes.optionSpan}>8</span>
          </IconButton>
          <IconButton
            className={`${classes.iconButton} ${classes.shareButton}`}
          >
            <ShareIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Post;
