import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from "formik";
import { Button } from "@material-ui/core";
import * as Yup from "yup";
import InputBase from "@material-ui/core/InputBase";
import UserIcon from "@material-ui/icons/PermIdentity";
import PasswordIcon from "@material-ui/icons/LockOutlined";
import Header from "../../components/Header";
import { useHistory, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";

const useStyles = makeStyles((theme) => ({
  root: {
    flex: "0.7",
  },
  button: {
    backgroundColor: "rgb(var(--colors-primary))",
    border: "none",
    fontWeight: "600",
    textTransform: "inherit",
    borderRadius: "30px",
    height: "48px",
    fontSize: "15px",
    marginTop: "20px",
    transition: "color 200ms, background-color 200ms ease-out",
    "&:hover": {
      backgroundColor: "rgba(var(--colors-primary), 0.7)",
    },
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "50%",
    margin: "100px auto",
    "& label": {
      marginTop: "20px",
    },
  },
  error: {
    color: "rgb(var(--colors-comp-primary))",
  },
  input: {
    fontWeight: "100",
    padding: "5px",
    backgroundColor: "rgb(var(--colors-secondary))",
    borderRadius: "30px",
  },
  inputDiv: {
    backgroundColor: "rgb(var(--colors-secondary))",
    borderRadius: "30px",
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(2),
  },
  icon: {
    color: "white",
  },
  signUpDiv: {
    display: "flex",
    alignSelf: "center",
    padding: "20px",
    color: "rgb(var(--colors-border))",
    "& a": {
      marginLeft: "5px",
      color: "rgb(var(--colors-comp-primary))",
    },
  },
}));

const LoginPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const notify = () =>
    toast.error("⛔ There was an error logging in. Please try again.");
  const { login } = useAuth();
  const formik = useFormik({
    initialValues: {
      handle: "",
      password: "",
    },
    validationSchema: Yup.object({
      handle: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const success = await login(values.handle, values.password);
      setSubmitting(false);
      if (!success) return notify();
      resetForm();
      return history.push("/");
    },
  });
  return (
    <div className={classes.root}>
      <Header title="Login" link="/login" />
      <form onSubmit={formik.handleSubmit} className={classes.form}>
        <label htmlFor="handle">Handle</label>
        <div className={classes.inputDiv}>
          <UserIcon className={classes.icon} />
          <InputBase
            className={classes.input}
            fullWidth
            placeholder="Username"
            id="handle"
            name="handle"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.handle}
          />
        </div>
        {formik.touched.handle && formik.errors.handle ? (
          <div className={classes.error}>{formik.errors.handle}</div>
        ) : null}
        <label htmlFor="password">Password</label>
        <div className={classes.inputDiv}>
          <PasswordIcon className={classes.icon} />
          <InputBase
            className={classes.input}
            fullWidth
            placeholder="Password"
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
        </div>
        {formik.touched.password && formik.errors.password ? (
          <div className={classes.error}>{formik.errors.password}</div>
        ) : null}
        <Button
          className={classes.button}
          variant="outlined"
          fullWidth
          type="submit"
        >
          {formik.isSubmitting ? "Loading..." : "Submit"}
        </Button>
        <div className={classes.signUpDiv}>
          <p>Don't have an account?</p>
          <Link to="/signup">Sign Up</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
