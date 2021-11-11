import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {useHistory, useLocation} from "react-router-dom";
import {menuList, appBarMenuList, menuListTeacher} from "./Menu";
import {useStylesLayout} from "../../Styles/LayoutStyle";
import {Badge, Menu, MenuItem} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import AccountCircle from "@mui/icons-material/AccountCircle";
import React, {useEffect, useState} from "react";
import {styled, alpha} from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import {useAuth} from "../../context/AuthContext";
import {LogoutOutlined} from "@mui/icons-material";
import { myFirebaseAuth } from "../../firebase";

const drawerWidth = 200; //drawer width

const Search = styled("div")(({theme}) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({theme}) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function LayoutPage({children}) {
  const {window} = children;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const classes = useStylesLayout();
  const history = useHistory();
  const location = useLocation();
  const {currentUser, logout, idToken} = useAuth();
  const [adminMenu, setAdminMenu] = useState(false);


  const getRole = () => {
    myFirebaseAuth.currentUser
      .getIdTokenResult()
      .then((idTokenResult) => {
        if (idTokenResult.claims.role === "TEA") {
          // console.log("Msgg - " + idTokenResult.claims.role);
          setAdminMenu(true)
        } else {
          setAdminMenu(false)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getRole();
  }, []);

 
  //   const {pathname} = location
  //   const splitLocation = pathname.split("/")
  //   console.log('Split - '+ splitLocation[1]);

  //   const menuItems =

  // useEffect(() => {
  //   setAdminMenu(getUserIdTokenResult())
  // }, [getUserIdTokenResult()]);



  const handleLogout = () => {
    logout()
      .then(() => {
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        // setError(err.message);
        // setError2("Failed to Logout");
      });
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  // Declare Desktop App Bar Menu
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {appBarMenuList.map((item) => (
        // <MenuItem key={item.text} onClick={() => {handleMenuClose; history.push(item.path)} }>
        <MenuItem
          key={item.text}
          onClick={() => {
            history.push(item.path);
          }}
        >
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            {item.icon}
          </IconButton>
          <span> </span> {item.text}
        </MenuItem>
      ))}
      <MenuItem onClick={handleLogout}>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <LogoutOutlined />
        </IconButton>
        Logout
      </MenuItem>
      {/* <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={handleMenuClose}>Settings</MenuItem> */}
    </Menu>
  );

  // Declare Mobile App Bar Menu
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>

      {appBarMenuList.map((item) => (
        // <MenuItem key={item.text} onClick={() => {handleMenuClose; history.push(item.path)} }>
        <MenuItem
          key={item.text}
          onClick={() => {
            history.push(item.path);
          }}
        >
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            {item.icon}
          </IconButton>
          <p> {item.text}</p>
        </MenuItem>
      ))}
      <MenuItem onClick={handleLogout}>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <LogoutOutlined />
        </IconButton>
        Logout
      </MenuItem>

      {/* <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <ListOutlined />
        </IconButton>
        <p>Profile</p>
      </MenuItem> */}
    </Menu>
  );

  // Declare Drware Components
  const drawer = (
    <div>
      <div>
        <Typography variant="h5" className={classes.title}>
          PWA MLMS
        </Typography>
        <image src= {`${process.env.PUBLIC_URL}/icons/icon-96.png`}/>
      </div>
      {/* <Toolbar /> */}
      <Divider />
      <List>
        {
        adminMenu
          ? menuListTeacher.map((item) => (
              <ListItem
                key={item.text}
                button
                onClick={() => history.push(item.path)}
              >
                {/* {location.pathname == item.path ?'True' : null} */}
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.text}
                  className={location.pathname === item.path ? "active" : null}
                />
              </ListItem>
            ))
          : menuList.map((item) => (
              <ListItem
                key={item.text}
                button
                onClick={() => history.push(item.path)}
              >
                {/* {location.pathname == item.path ?'True' : null} */}
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.text}
                  className={location.pathname === item.path ? "active" : null}
                />
              </ListItem>
            ))}

        {/* 
        {currentUser
          .getIDTokeResult()
          .then((idTokenResult) => {
            if (!!idTokenResult.claims.role === "STD") {
              menuList.map((item) => (
                <ListItem
                  key={item.text}
                  button
                  onClick={() => history.push(item.path)}
                >
                  {/* {location.pathname == item.path ?'True' : null} *
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    className={
                      location.pathname === item.path ? "active" : null
                    }
                  />
                </ListItem>
              ));
            } else {
              menuListTeacher.map((item) => (
                <ListItem
                  key={item.text}
                  button
                  onClick={() => history.push(item.path)}
                >
                  {/* {location.pathname == item.path ?'True' : null} *
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    className={
                      location.pathname === item.path ? "active" : null
                    }
                  />
                </ListItem>
              ));
            }
          })
          .catch((err) => {
            console.log(err);
          })} */}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{display: "flex"}}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: {sm: `calc(100% - ${drawerWidth}px)`},
          ml: {sm: `${drawerWidth}px`},
        }}
      >
        <Toolbar>
          {/* Open Drawer Icon */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{mr: 2, display: {sm: "none"}}}
          >
            <MenuIcon />
          </IconButton>
          {/* Text on App Bar */}
          <Typography variant="body1" component="div">
            Welcome to PWA MLMS
          </Typography>

          {/* Start Search Bar Textbox */}
          <Search sx={{display: {xs: "none", md: "flex"}}}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{"aria-label": "search"}}
            />
          </Search>
          {/* End Search Bar Textbox */}

          {/* StartBadges on App Bar to the Right */}
          <Box sx={{flexGrow: 1}} />
          <Box sx={{display: {xs: "none", md: "flex"}}}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{display: {xs: "flex", md: "none"}}}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
          {/* End Badges on App Bar to the Right */}
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0}}}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: {xs: "block", sm: "none"},
            "& .MuiDrawer-paper": {boxSizing: "border-box", width: drawerWidth},
          }}
        >
          {/* Render Mobile Drawer */}
          {drawer}

          {/* Render Mobile App Bar Menu */}
          {renderMobileMenu}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: {xs: "none", sm: "block"},
            "& .MuiDrawer-paper": {boxSizing: "border-box", width: drawerWidth},
          }}
          open
        >
          {/* Render Desktop Drawer */}
          {drawer}

          {/* Render Desktop App Bar Menu */}
          {renderMenu}
        </Drawer>
      </Box>

      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {/* // to show the children component from the App.js */}
        {children}
      </div>
    </Box>
  );
}

export default LayoutPage;
