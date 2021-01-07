import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBody from "./containers/AppBody";
import Sidebar from "./containers/Sidebar";
import Feed from "./containers/Feed";
import Widgets from "./containers/Widgets";
import Notifications from "./containers/Notifications";
// import Messages from "./containers/Messages";
import Profile from "./containers/Profile";
import { makeStyles } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    display: "flex",
    height: "100vh",
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: "1300px",
    padding: "0 10px",
  },
});

function App() {
  const classes = useStyles();
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className={classes.root}>
          <Sidebar />
          <AppBody>
            <Switch>
              <Route path="/" exact component={Feed} />
              <Route path="/notifications" component={Notifications} />
              {/* <Route path="/messages" component={Messages} /> */}
              <Route path="/profile" component={Profile} />
            </Switch>
            <Widgets />
          </AppBody>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
