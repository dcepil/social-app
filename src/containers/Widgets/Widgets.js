import { makeStyles } from "@material-ui/core/styles";
import Searchbar from "../../components/Searchbar";
import { useApi } from "../../hooks/useApi";

const useStyles = makeStyles({
  root: {
    flex: "0.3",
    borderLeft: "1px solid rgba(var(--colors-border), 0.3)",
    padding: "0 30px",
    paddingTop: "10px",
    height: "100%",
    position: "sticky",
    top: "0",
  },
});

const Widgets = () => {
  const classes = useStyles();
  const { state } = useApi();
  return state.user ? (
    <aside className={classes.root}>
      <Searchbar />
    </aside>
  ) : (
    <aside className={classes.root}></aside>
  );
};

export default Widgets;
