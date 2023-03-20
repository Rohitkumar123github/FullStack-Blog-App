import React, { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";

const Header = () => {
  //global states
  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");
  console.log(isLogin);
  //variable for useDispatch
  const dispatch = useDispatch();
  //normal states
  const [value, setValue] = useState();

  //Logout
  const navigate = useNavigate();
  const handleLogout = () => {
    try {
      dispatch(authActions.logout());
      toast.success("Logged Out SuccessFully");
      navigate("/login");
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h4">My Block App</Typography>
          {isLogin && (
            <Box display={"flex"} marginLeft="auto" marginRight="auto">
              <Tabs
                textColor="inherit"
                value={value}
                onChange={(e, val) => setValue(val)}
              >
                <Tab label="Blogs" LinkComponent={Link} to="/blogs" />
                <Tab label="My Blogs" LinkComponent={Link} to="/my-blogs" />
                <Tab
                  label="Create Blog"
                  LinkComponent={Link}
                  to="/create-blog"
                />
              </Tabs>
            </Box>
          )}
          <Box display={"flex"} marginLeft="auto">
            {!isLogin && (
              <>
                <Link to={"/login"}>
                  <Button sx={{ margin: 1, color: "white" }}>Login</Button>
                </Link>
                <Link to={"/register"}>
                  <Button sx={{ margin: 1, color: "white" }}>Register</Button>
                </Link>
              </>
            )}

            {isLogin && (
              <Button onClick={handleLogout} sx={{ margin: 1, color: "white" }}>
                LogOut
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
