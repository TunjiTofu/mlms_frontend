import React, {useState} from "react";
import {Paper, Tab, Tabs, Box, Typography, Container} from "@mui/material";
import Login from "./Login";
import Register from "./Register";
import {useStyles} from "../../Styles/AuthStyle";

function LoginRegisterContainer() {
  const [value, setValue] = useState(0);
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  return (
    <div>
      <Container maxWidth="xs">
        <Paper elevation={4} className={classes.LoginContainerPaper}>
          <Tabs
            value={value}
            textColor="secondary"
            indicatorColor="secondary"
            onChange={handleChange}
          >
            <Tab label="Sign In" />
            <Tab label="Register" />
          </Tabs>
          <TabPanel value={value} index={0}>
            {/* Import Register Component */}
            <Login handleChange={handleChange} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            {/* Import Login Component */}
            <Register handleChange={handleChange} />
          </TabPanel>
        </Paper>
      </Container>
    </div>
  );
}

export default LoginRegisterContainer;
