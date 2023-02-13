import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  TextField,
} from "@mui/material";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch } from "react-redux";

import ForgotPasswordPage from "pages/forgotpassword/forgotpassword.page";
import { setCurrentUser } from "slices/userSlice";
import Toast from "components/tostify/Toast";
import useHttp from "utils/useHttp";

import { validateEmail, validatePassword } from "validators/auth";
import logo from "assets/logo.png";
import useStyles from "pages/login/login.styles";

const LoginPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { loading, request, error, clearError } = useHttp();
  const [loginCredentials, setLoginCredentials] = useState({
    email: { value: "", error: false, errorMessage: "" },
    password: { value: "", error: false, errorMessage: "" },
  });

  const changeHandlerData = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginCredentials({
      ...loginCredentials,
      [name]: {
        value: value,
        error: false,
        errorMessage: "",
      },
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let { email, password } = loginCredentials;

    email = { ...email, ...validateEmail(loginCredentials.email.value) };
    password = {
      ...password,
      ...validatePassword(loginCredentials.password.value),
    };

    setLoginCredentials({ email, password });

    if (!(email.error || password.error)) {
      const response = await request("/auth/login", "POST", {
        email: email.value,
        password: password.value,
      });

      if (!error) {
        dispatch(setCurrentUser(response.data.user));
        Toast("success", "Logged in successfully.");
        localStorage.setItem("token", response.data.token);
        setLoginCredentials({
          email: { value: "", error: false, errorMessage: "" },
          password: { value: "", error: false, errorMessage: "" },
        });
        navigate("/");
      }
    }
  };

  useEffect(() => {
    if (error) {
      Toast("danger", error);
      clearError();
    }
  }, [error]);

  return (
    <Container component="main" className={classes.container}>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <CssBaseline />
          <Box
            component="img"
            className={classes.img}
            src={logo}
            alt="expenseWise"
          />
          <Box
            sx={{
              width: {
                xl: "35%",
                lg: "35%",
                md: "40%",
                sm: "90%",
              },
            }}
          >
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                autoComplete="email"
                id="email"
                fullWidth
                autoFocus
                label="Email Address"
                className={classes.textField}
                placeholder="Email"
                name="email"
                value={loginCredentials.email.value}
                onChange={changeHandlerData}
                error={loginCredentials.email.error}
              />
              {loginCredentials.email.error && (
                <div className={classes.errorMessage}>
                  {loginCredentials.email.errorMessage}
                </div>
              )}
              <TextField
                margin="normal"
                label="Password"
                type="password"
                id="password"
                fullWidth
                autoComplete="current-password"
                className={classes.textField}
                name="password"
                value={loginCredentials.password.value}
                onChange={changeHandlerData}
                error={loginCredentials.password.error}
              />
              {loginCredentials.password.error && (
                <div className={classes.errorMessage}>
                  {loginCredentials.password.errorMessage}
                </div>
              )}
              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{ mt: 2 }}
              >
                Sign in
              </Button>
            </Box>
            <Grid container>
              <Grid item xs>
                <Link
                  component="button"
                  onClick={() => setModalIsOpen(true)}
                  variant="body2"
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link component={RouterLink} to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <ForgotPasswordPage
              isOpen={modalIsOpen}
              onClose={() => setModalIsOpen(false)}
            />
          </Box>
        </>
      )}
    </Container>
  );
};

export default LoginPage;
