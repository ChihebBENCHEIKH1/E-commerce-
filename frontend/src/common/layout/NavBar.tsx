import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Menu,
  MenuItem,
  Avatar,
  Box,
} from "@mui/material";
import styled from "styled-components";
import { logout } from "../../features/auth/thunks/AuthThunk";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedInUser } from "../../features/auth/selectors/AuthSelector";

const Logo = styled.img`
  height: 60px;
`;

const Navbar = ({ motorcycleList = ["bla"] }) => {
  const dispatch = useDispatch();
  const user = useSelector(getLoggedInUser);
  const username = `${user?.firstName} ${user?.lastName}`;
  const [anchorEl, setAnchorEl] = useState(null);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const userMenuOpen = Boolean(userMenuAnchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleUserMenuOpen = (event) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleUserMenuClose();
  };

  return (
    <AppBar sx={{ backgroundColor: "#000" }} position="static">
      <Container>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Logo src="company logo.png" alt="Motorcycle Xpert Logo" />
          </Typography>

          <Button
            color="inherit"
            aria-controls="motorcycles-menu"
            aria-haspopup="true"
            onClick={handleMenuOpen}
          >
            Motorcycles
          </Button>
          <Menu
            id="motorcycles-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
          >
            {motorcycleList.map((motorcycle, index) => (
              <MenuItem key={index} onClick={handleMenuClose}>
                {motorcycle}
              </MenuItem>
            ))}
          </Menu>

          <Button color="inherit" href="#services">
            Services
          </Button>
          <Button color="inherit" href="#contact">
            Contact
          </Button>

          <Box
            sx={{ display: "flex", alignItems: "center", marginLeft: "2rem" }}
          >
            <Avatar
              sx={{
                bgcolor: "primary.main",
                marginRight: "0.5rem",
                cursor: "pointer",
              }}
              onClick={handleUserMenuOpen}
            >
              {username?.slice(0, 2).toUpperCase()}
            </Avatar>

            <Menu
              id="user-menu"
              anchorEl={userMenuAnchorEl}
              open={userMenuOpen}
              onClose={handleUserMenuClose}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginLeft: "2rem",
              gap: "0.5rem",
            }}
          >
            🇬🇧
            <Typography variant="body1">ENG</Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
