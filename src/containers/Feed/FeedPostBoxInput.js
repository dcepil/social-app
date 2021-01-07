import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, IconButton, InputBase } from "@material-ui/core";
import ImageIcon from "@material-ui/icons/ImageOutlined";

const useStyles = makeStyles({
  root: {
    marginTop: "5px",
    width: "100%",
  },
  input: {
    fontSize: "20px",
    fontWeight: "100",
    paddingLeft: "10px",
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
  fileInput: {
    display: "none",
  },
  iconButton: {
    color: "rgb(var(--colors-primary))",
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

const FeedPostBoxInput = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <InputBase
        className={classes.input}
        fullWidth
        multiline
        placeholder="Post something!"
        inputProps={{ "aria-label": "post input box", maxLength: 250 }}
      />
      <div className={classes.optionsDiv}>
        <input
          accept="image/*"
          className={classes.fileInput}
          id="icon-button-file"
          type="file"
        />
        <label htmlFor="icon-button-file">
          <IconButton
            className={classes.iconButton}
            aria-label="upload picture"
            component="span"
          >
            <ImageIcon />
          </IconButton>
        </label>
        <Button className={classes.button} variant="outlined">
          Post
        </Button>
      </div>
    </div>
  );
};

export default FeedPostBoxInput;
