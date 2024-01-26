import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  Grid,
} from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";

const validationSchema = yup.object({
  username: yup
    .string("Enter you username")
    .min(3, "Username should be of minimum 3 characters length")
    .max(20, "Username should be of maximum 20 characters length")
    .required("Username is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/,
      "Must Contain 5 Characters, One Uppercase, One Lowercase, One Number"
    ),
  confirmPassword: yup
    .string("Enter your password confirmation")
    .required("Password confirmation is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const RegisterForm = () => {
  const [validFormData, setValidFormData] = useState(null);
  const [showFormData, setShowFormData] = useState(false);

  const updateValidFormData = (previousValue) => {
    setValidFormData({
      ...previousValue,
    });
    setShowFormData(true);
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      updateValidFormData(values);
    },
  });

  return (
    <div>
      <Typography component="h3" variant="h3">
        Register form
      </Typography>
      {showFormData && (
        <div>
          <List>
            <ListItem>
              <b>Username:</b>&nbsp;
              <span>{validFormData?.username}</span>
            </ListItem>
            <ListItem>
              <b>Email:</b>&nbsp;
              <span>{validFormData?.email}</span>
            </ListItem>
            <ListItem>
              <b>Password:</b>&nbsp;
              <span>{validFormData?.password}</span>
            </ListItem>
            <ListItem>
              <b>Password again:</b>&nbsp;
              <span>{validFormData?.confirmPassword}</span>
            </ListItem>
          </List>
        </div>
      )}

      <form onSubmit={formik.handleSubmit}>
        <TextField
          variant="outlined"
          fullWidth
          id="username"
          name="username"
          label="Username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.username && !!formik.errors.username}
          helperText={formik.touched.username && formik.errors.username}
          margin="normal"
        />
        <TextField
          variant="outlined"
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && !!formik.errors.email}
          helperText={formik.touched.email && formik.errors.email}
          margin="normal"
        />
        <TextField
          variant="outlined"
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && !!formik.errors.password}
          helperText={formik.touched.password && formik.errors.password}
          margin="normal"
        />
        <TextField
          variant="outlined"
          fullWidth
          id="confirmPassword"
          name="confirmPassword"
          label="Password again"
          type="password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.confirmPassword && !!formik.errors.confirmPassword
          }
          helperText={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
          margin="normal"
        />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button color="primary" variant="contained" fullWidth type="submit">
              Submit
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              onClick={() => formik.resetForm()}
              fullWidth
              color="primary"
              variant="outlined"
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

function App() {
  return <RegisterForm />;
}

export default App;
