import React from "react";
import { connect } from "react-redux";
import { authSignup } from "../store";

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  makeStyles,
} from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import theme from "../theme";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles({
  gradient: {
    backgroundColor: theme.palette.primary.main,
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  center: {
    alignItems: "center",
    width: "inherit",
  },
});

const SignupForm = ({ handleSubmit, error }) => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" className={classes.paper}>
        <CssBaseline />
        <Avatar className={classes.avatar} />
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form
          className={classes.form}
          onSubmit={handleSubmit}
          name="signup"
          noValidate
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid container item xs={12} />
          </Grid>
          {error && error.response && (
            <Alert severity="error"> {error.response.data} </Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item xs>
              {/* <Link href="/auth/google" variant="body2">
                Sign Up with Google
              </Link> */}
            </Grid>
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
        <Box mt={5} />
      </Container>
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => {
  return {
    error: state.user.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSubmit(ev) {
      ev.preventDefault();
      const email = ev.target.email.value;
      const password = ev.target.password.value;
      const firstName = ev.target.firstName.value;
      const lastName = ev.target.lastName.value;
      dispatch(authSignup(email, password, firstName, lastName));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
