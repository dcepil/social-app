import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, InputBase } from "@material-ui/core";
import FeedPostBoxOption from "./FeedPostBoxOption";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";

const useStyles = makeStyles({
  root: {
    marginTop: "5px",
    width: "100%",
  },
  input: {
    fontSize: "20px",
    fontWeight: "100",
    marginLeft: "10px",
  },
  optionsDiv: {
    display: "flex",
    marginTop: "10px",
  },
  button: {
    backgroundColor: "rgb(var(--colors-primary))",
    border: "none",
    fontWeight: "600",
    textTransform: "inherit",
    borderRadius: "30px",
    fontSize: "15px",
    transition: "color 200ms, background-color 200ms ease-out",
    marginLeft: "auto",
    "&:hover": {
      backgroundColor: "rgba(var(--colors-primary), 0.7)",
    },
  },
});

const FeedPostBoxInput = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <InputBase
        className={classes.input}
        fullWidth
        multiline
        placeholder="Post something!"
        inputProps={{ "aria-label": "post input box" }}
      />
      <div className={classes.optionsDiv}>
        <FeedPostBoxOption Icon={ImageOutlinedIcon} />
        <Button className={classes.button} variant="outlined">
          Post
        </Button>
      </div>
    </div>
  );
};

export default FeedPostBoxInput;
