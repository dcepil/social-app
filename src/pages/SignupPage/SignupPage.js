import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from "formik";
import { Button } from "@material-ui/core";
import * as Yup from "yup";
import InputBase from "@material-ui/core/InputBase";
import Header from "../../components/Header";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import { useHistory, Link } from "react-router-dom";
import NameIcon from "@material-ui/icons/AccountCircleOutlined";
import PasswordIcon from "@material-ui/icons/LockOutlined";
import HandleIcon from "@material-ui/icons/PermIdentity";
import EmailIcon from "@material-ui/icons/EmailOutlined";
import BirthdateIcon from "@material-ui/icons/CakeOutlined";

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
  loginDiv: {
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

const SignupPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const { signup } = useAuth();
  const [date, setDate] = useState(new Date());
  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
      handle: "",
      email: "",
      birthdate: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Required")
        .min(5, "Minimum 5 characters")
        .max(25, "Maximum 25 characters"),
      password: Yup.string()
        .required("Required")
        .trim("Includes invalid characters")
        .strict(true)
        .matches(/^\S+$/, {
          message: "Includes invalid characters",
        })
        .min(8, "Minimum 8 characters")
        .max(32, "Maximum 32 characters"),
      handle: Yup.string()
        .required("Required")
        .trim("Includes invalid characters")
        .strict(true)
        .matches(/^\S+$/, {
          message: "Includes invalid characters",
        })
        .min(5, "Minimum 5 characters")
        .max(15, "Maximum 15 characters"),
      email: Yup.string().required("Required").email("Must be a valid email"),
      birthdate: Yup.date()
        .required("Required")
        .max(new Date(), "Don't go into the future...")
        .typeError("Must be a valid date"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const success = await signup(
        values.name,
        values.password,
        values.handle,
        values.email,
        values.birthdate
      );
      setSubmitting(false);
      if (!success)
        return toast.error(
          "⛔ There was an error signing up. Please try again."
        );
      resetForm();
      history.push("/login");
      return toast.success("✔️ Signed up successfully. Please log in.");
    },
  });
  return (
    <div className={classes.root}>
      <Header title="Sign Up" link="/signup" />
      <form onSubmit={formik.handleSubmit} className={classes.form}>
        <label htmlFor="name">Name</label>
        <div className={classes.inputDiv}>
          <NameIcon className={classes.icon} />
          <InputBase
            className={classes.input}
            fullWidth
            placeholder="Name"
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
        </div>
        {formik.touched.name && formik.errors.name ? (
          <div className={classes.error}>{formik.errors.name}</div>
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
        <label htmlFor="Handle">Handle</label>
        <div className={classes.inputDiv}>
          <HandleIcon className={classes.icon} />
          <InputBase
            className={classes.input}
            fullWidth
            placeholder="Handle"
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
        <label htmlFor="email">Email</label>
        <div className={classes.inputDiv}>
          <EmailIcon className={classes.icon} />
          <InputBase
            className={classes.input}
            fullWidth
            placeholder="Email"
            id="email"
            name="email"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
        </div>
        {formik.touched.email && formik.errors.email ? (
          <div className={classes.error}>{formik.errors.email}</div>
        ) : null}
        <label htmlFor="birthdate">Birthdate</label>
        <div className={classes.inputDiv}>
          <BirthdateIcon className={classes.icon} />
          <InputBase
            className={classes.input}
            fullWidth
            placeholder="Birthdate (YYYY-MM-DD)"
            id="birthdate"
            name="birthdate"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.birthdate}
          />
        </div>
        {formik.touched.birthdate && formik.errors.birthdate ? (
          <div className={classes.error}>{formik.errors.birthdate}</div>
        ) : null}
        <Button
          className={classes.button}
          variant="outlined"
          fullWidth
          type="submit"
        >
          {formik.isSubmitting ? "Loading..." : "Submit"}
        </Button>
        <div className={classes.loginDiv}>
          <p>Already have an account?</p>
          <Link to="/login">Log In</Link>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
