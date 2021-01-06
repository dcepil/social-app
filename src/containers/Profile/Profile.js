import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Header from "../../components/Header";

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
    </div>
  );
};

export default Profile;
