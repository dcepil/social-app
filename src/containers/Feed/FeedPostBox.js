import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar } from "@material-ui/core";
import { deepOrange } from "@material-ui/core/colors";
import FeedPostBoxInput from "./FeedPostBoxInput";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "10px 15px",
    borderBottom: "1px solid rgba(var(--colors-border), 0.3)",
  },
  input: {
    display: "flex",
    color: "rgb(var(--colors-background))",
  },
  avatarDiv: {
    marginRight: "10px",
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  large: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
}));

const FeedBox = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <form>
        <div className={classes.input}>
          <div className={classes.avatarDiv}>
            <Avatar
              className={`${classes.orange} ${classes.large} ${classes.avatar}`}
              alt="User's avatar"
            >
              T
            </Avatar>
          </div>
          <FeedPostBoxInput />
        </div>
      </form>
    </div>
  );
};

export default FeedBox;
