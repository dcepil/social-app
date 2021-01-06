import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBody from "./containers/AppBody";
import Sidebar from "./containers/Sidebar";
import Feed from "./containers/Feed";
import Widgets from "./containers/Widgets";

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <AppBody>
            <Sidebar />
            <Switch>
              <Route path="/" exact component={Feed} />
            </Switch>
            <Widgets />
          </AppBody>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
