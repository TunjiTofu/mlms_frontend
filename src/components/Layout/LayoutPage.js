import * as React from "react";
import PropTypes from "prop-types";
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
import {makeStyles} from "@mui/styles";
import {useHistory, useLocation} from "react-router-dom";
import { menuList } from "./Menu";
import { useStylesLayout } from "../../Styles/LayoutStyle";


const drawerWidth = 240; //drawer width

function LayoutPage({children}) {
  const {window} = children;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const classes = useStylesLayout();
  const history = useHistory();
  const location = useLocation();

//   const {pathname} = location
//   const splitLocation = pathname.split("/")
//   console.log('Split - '+ splitLocation[1]);

//   const menuItems = 

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
        <div>
            <Typography variant="h5" className={classes.title}>
              PWA MLMS
            </Typography>
          </div>
      {/* <Toolbar /> */}
      <Divider />
      <List>
        {menuList.map((item) => (
          <ListItem
            key={item.text}
            button
            onClick={() => history.push(item.path)}

            
          >
              {/* {location.pathname == item.path ?'True' : null} */}
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} className={location.pathname == item.path ? 'active' : null}/>
          </ListItem>
        ))}
     
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
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{mr: 2, display: {sm: "none"}}}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography>
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
         
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: {xs: "none", sm: "block"},
            "& .MuiDrawer-paper": {boxSizing: "border-box", width: drawerWidth},
          }}
          open
        >
            
          {drawer}
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
