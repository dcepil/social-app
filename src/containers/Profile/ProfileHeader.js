import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Button } from "@material-ui/core";
import LinkIcon from "@material-ui/icons/Link";
import BirthdayIcon from "@material-ui/icons/CakeOutlined";
import JoinedIcon from "@material-ui/icons/CalendarTodayOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    padding: "20px",
    borderBottom: "1px solid rgba(var(--colors-border), 0.3)",
  },
  avatar: {
    height: theme.spacing(12),
    width: theme.spacing(12),
  },
  details: {
    width: "100%",
  },
  handle: {
    display: "block",
    color: "rgb(var(--colors-border))",
    marginBottom: theme.spacing(2),
  },
  name: {
    display: "block",
    fontWeight: "800",
    fontSize: "24px",
  },
  icons: {
    color: "rgb(var(--colors-border))",
  },
  detailsItem: {
    display: "flex",
    alignItems: "center",
    color: "rgb(var(--colors-border))",
    width: "fit-content",
    borderRadius: "30px",
    padding: theme.spacing(1),
    "& .MuiSvgIcon-root": {
      marginRight: theme.spacing(1),
    },
  },
  link: {
    transition: "color 200ms ease-out",
    "&:hover": {
      color: "rgb(var(--colors-primary))",
    },
  },
  nameDiv: {
    paddingLeft: "10px",
    marginBottom: theme.spacing(4),
  },
  button: {
    backgroundColor: "rgb(var(--colors-primary))",
    border: "none",
    fontWeight: "600",
    textTransform: "inherit",
    borderRadius: "30px",
    fontSize: "15px",
    transition: "color 200ms, background-color 200ms ease-out",
    float: "right",
    "&:hover": {
      backgroundColor: "rgba(var(--colors-primary), 0.7)",
    },
  },
}));

const ProfileHeader = ({
  name,
  handle,
  description,
  link,
  birthday,
  joined,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.avatarDiv}>
        <Avatar className={classes.avatar} />
      </div>
      <div className={classes.details}>
        <div className={classes.nameDiv}>
          <Button className={classes.button} variant="outlined">
            Settings
          </Button>
          <span className={classes.name}>{name}</span>
          <span className={classes.handle}>@{handle}</span>
          <p>{description}</p>
        </div>
        <div className={classes.icons}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className={`${classes.detailsItem} ${classes.link}`}
            href={link}
          >
            <LinkIcon fontSize="small" />
            <span>{link}</span>
          </a>
          <span className={classes.detailsItem}>
            <BirthdayIcon fontSize="small" />
            <span>Born {birthday}</span>
          </span>
          <span className={classes.detailsItem}>
            <JoinedIcon fontSize="small" />
            <span>Joined {joined}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
