import "./App.css";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import LoginRegisterContainer from "./components/auth/LoginRegisterContainer";
import {AuthProvider} from "./context/AuthContext";
import Dashboard from "./components/pages/Dashboard";
import PrivateRoute from "./components/PrivatRoute";
import LayoutPage from "./components/Layout/LayoutPage";
import Logout from "./components/auth/Logout";
import ClassModules from "./components/pages/ClassModules";
import ClassPosts from "./components/pages/ClassPosts";
import DashboardN from "./components/pages/DashboardN";
import ClassDetail from "./components/pages/ClassDetail";
import PostContent from "./components/pages/classposts/PostContent";

// Primary - #039be5
const theme = createTheme({
  palette: {
    primary: {
      main: "#039bef",
      light: "#35aff2",
      dark: "#026ca7",
      // contrastText:'#'
    },
    secondary: {
      main: "#f50057",
      light: "#f73378",
      dark: "#ab003c",
    },
    text: {
      primary: "#616161",
      secondary: "#434343",
    },
  },
  // typography: {
  //   fontFamily: "Quicksand",
  //   fontWeightLight: 400,
  //   fontWeightRegular: 500,
  //   fontWeightMedium: 600,
  //   fontWeightBold: 700,
  // },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AuthProvider>
          <Switch>
            <Route exact path="/" component={LoginRegisterContainer} />
            <Route exact path="/logout" component={Logout} />
            <LayoutPage> 
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/dashboardn" component={DashboardN} />
              <PrivateRoute exact path="/class/:classId" component={ClassDetail} />
              <PrivateRoute exact path="/modules/:classId" component={ClassModules} />
              <PrivateRoute exact path="/posts/:classId/:moduleId" component={ClassPosts} />
              <PrivateRoute exact path="/postcontent/:classId/:moduleId/:postId" component={PostContent} />
              {/* <Route>404 Not Found!</Route> */}
            </LayoutPage>
          </Switch>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
