import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBody from "./containers/AppBody";
import Sidebar from "./containers/Sidebar";
import Feed from "./containers/Feed";
import Widgets from "./containers/Widgets";
// import Notifications from "./containers/Notifications";
// import Messages from "./containers/Messages";
import Profile from "./containers/Profile";
import { makeStyles } from "@material-ui/core/styles";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import LoginPage from "./pages/LoginPage";
import axios from "axios";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import PrivateRoute from "./components/PrivateRoute";
import SignupPage from "./pages/SignupPage";

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
  error: {
    flex: "0.7",
    textAlign: "center",
    justifyContent: "center",
    alignSelf: "center",
    fontSize: "3rem",
    fontWeight: "100",
    color: "rgb(var(--colors-border))",
  },
});

const queryClient = new QueryClient();

axios.defaults.withCredentials = true;
axios.defaults.xsrfHeaderName = "csrf-token";

function App() {
  const classes = useStyles();
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className={classes.root}>
            <Sidebar />
            <AppBody>
              <Switch>
                <Route path="/login">
                  <LoginPage />
                </Route>
                <Route path="/signup">
                  <SignupPage />
                </Route>
                <PrivateRoute path="/" exact>
                  <Feed />
                </PrivateRoute>
                <PrivateRoute path="/profile">
                  <Profile />
                </PrivateRoute>
                <Route path="*">
                  <div className={classes.error}>404 Not Found</div>
                </Route>
              </Switch>
              <Widgets />
            </AppBody>
          </div>
        </ThemeProvider>
      </Router>
      <ToastContainer
        position="bottom-center"
        newestOnTop
        transition={Slide}
        closeButton={false}
      />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
