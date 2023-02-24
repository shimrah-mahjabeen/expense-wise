import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { Stack } from "@mui/system";

import { validateFirstName, validateLastName } from "validators/auth";
import { modifyCurrentUser } from "slices/userSlice";
import type { RootState } from "app/store";
import Toast from "components/tostify/Toast";
import useHttp from "utils/useHttp";

import { styles } from "constants/styles";
import useStyles from "pages//profile/profile.styles";

const ProfilePage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const { loading, request, error, clearError } = useHttp();

  const [profileData, setProfileData] = useState({
    firstName: { value: currentUser.firstName, error: false, errorMessage: "" },
    lastName: { value: currentUser.lastName, error: false, errorMessage: "" },
    email: currentUser.email,
    imageUrl: currentUser.imageUrl,
  });

  useEffect(() => {
    setProfileData({
      firstName: {
        value: currentUser.firstName,
        error: false,
        errorMessage: "",
      },
      lastName: { value: currentUser.lastName, error: false, errorMessage: "" },
      email: currentUser.email,
      imageUrl: currentUser.imageUrl,
    });
  }, [currentUser]);

  const changeHandlerData = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProfileData({
      ...profileData,
      [name]: {
        value: value,
        error: false,
        errorMessage: "",
      },
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let { firstName, lastName, imageUrl, email } = profileData;

    firstName = {
      ...firstName,
      ...validateFirstName(profileData.firstName.value),
    };
    lastName = {
      ...lastName,
      ...validateLastName(profileData.lastName.value),
    };

    setProfileData({
      firstName,
      lastName,
      imageUrl: imageUrl,
      email: email,
    });

    if (
      currentUser.firstName === firstName.value &&
      currentUser.lastName === lastName.value
    ) {
      firstName.error = true;
      firstName.errorMessage = "Please update first name.";
      lastName.error = true;
      lastName.errorMessage = "Please update last name.";
    }

    if (!(firstName.error || lastName.error)) {
      const response = await request("/auth/me", "PUT", {
        firstName: firstName.value,
        lastName: lastName.value,
      });

      if (!error) {
        dispatch(modifyCurrentUser(response.data));
        Toast("success", "Profile updated successfully.");
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
    <Box className={classes.rootContainer}>
      <Container
        component="main"
        maxWidth="md"
        className={classes.container}
        sx={{ boxShadow: 5, mt: 5 }}
      >
        <Stack sx={{ alignItems: "center", p: 2 }}>
          <Avatar
            alt="Remy Sharp"
            sx={{
              width: 150,
              height: 150,
              bgcolor: `${styles.theme.primaryColor}`,
              border: `5px solid ${styles.userAvatar.border}`,
              fontSize: 150,
            }}
          >
            {currentUser.firstName.substring(0, 1).toUpperCase()}
          </Avatar>
        </Stack>
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box className={classes.box}>
                <Typography>First Name</Typography>
                <TextField
                  className={classes.textfield}
                  variant="outlined"
                  inputProps={{ style: { padding: 7 } }}
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  value={profileData.firstName.value}
                  onChange={changeHandlerData}
                  error={profileData.firstName.error}
                />
                {profileData.firstName.error && (
                  <div className={classes.errorMessage}>
                    {profileData.firstName.errorMessage}
                  </div>
                )}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box className={classes.box}>
                <Typography>Last Name</Typography>
                <TextField
                  className={classes.textfield}
                  variant="outlined"
                  inputProps={{ style: { padding: 7 } }}
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  value={profileData.lastName.value}
                  onChange={changeHandlerData}
                  error={profileData.lastName.error}
                />
                {profileData.lastName.error && (
                  <div className={classes.errorMessage}>
                    {profileData.lastName.errorMessage}
                  </div>
                )}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box className={classes.box}>
                <Typography>Email</Typography>
                <TextField
                  disabled
                  className={classes.textfield}
                  sx={{ backgroundColor: styles.list.backgroundColor }}
                  variant="outlined"
                  inputProps={{ style: { padding: 7 } }}
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={profileData.email}
                />
              </Box>
            </Grid>
            <Grid container justifyContent="center">
              <Button
                type="submit"
                sx={{ my: 2, width: "160px" }}
                variant="contained"
                color="primary"
                disabled={loading}
              >
                {loading ? <CircularProgress size={25} /> : "Update Profile"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default ProfilePage;
