import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { useApi } from "../../hooks/useApi";
import { Route, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    flex: "0.7",
    textAlign: "center",
    justifyContent: "center",
    alignSelf: "center",
    fontSize: "3rem",
    fontWeight: "100",
    color: "rgb(var(--colors-border))",
  },
});

const PrivateRoute = ({ children, ...rest }) => {
  const classes = useStyles();
  const auth = useAuth();
  const api = useApi();
  return auth.isAuthLoading ? (
    <Route
      {...rest}
      render={() => <p className={classes.root}>Loading...</p>}
    />
  ) : (
    <Route
      {...rest}
      render={({ location }) =>
        api.state.user ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
};

export default PrivateRoute;
