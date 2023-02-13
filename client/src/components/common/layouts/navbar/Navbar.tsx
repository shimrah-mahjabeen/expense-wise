import { AccountCircle, Menu as MenuIcon } from "@mui/icons-material";
import {
  AppBar,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { MouseEvent, useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import DrawerMenu from "components/common/layouts/drawer/DrawerMenu";
import { useDispatch } from "react-redux";

import { setCurrentUserEmpty } from "slices/userSlice";
import Toast from "components/tostify/Toast";
import useHttp from "utils/useHttp";

const Navbar = () => {
  const [auth] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { request, error, clearError } = useHttp();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState<null | HTMLElement>(null);

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setMenuOpen(event.currentTarget);
  };

  const handleClose = () => {
    setMenuOpen(null);
  };

  const toggleSlider = () => {
    setDrawerOpen(!drawerOpen);
  };

  const logout = async (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    await request("/auth/logout", "GET");

    if (!error) {
      dispatch(setCurrentUserEmpty());
      Toast("success", "Successfully logged out.");
      localStorage.setItem("token", "");
      navigate("/login");
    }
  };

  const profile = async () => {
    navigate("/profile");
    setMenuOpen(null);
  };

  useEffect(() => {
    if (error) {
      Toast("danger", error);
      clearError();
    }
  }, [error]);

  return (
    <AppBar>
      <Toolbar>
        <IconButton
          onClick={toggleSlider}
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <DrawerMenu open={drawerOpen} toggle={toggleSlider} />
        <Typography component="div" sx={{ flexGrow: 1 }}>
          <Link
            component={RouterLink}
            to="/"
            variant="h6"
            color="inherit"
            underline="none"
          >
            ExpenseWise
          </Link>
        </Typography>
        {auth && (
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={menuOpen}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(menuOpen)}
              onClose={handleClose}
            >
              <MenuItem sx={{ pr: "2rem" }} onClick={profile}>
                Profile
              </MenuItem>
              <MenuItem sx={{ pr: "2rem" }} onClick={logout}>
                Logout
              </MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
