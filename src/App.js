// import "./App.css";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import LoginRegisterContainer from "./components/auth/LoginRegisterContainer";
import { AuthProvider } from "./context/AuthContext";
import Dashboard from "./components/pages/Dashboard";
import PrivateRoute from "./components/PrivatRoute";

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
          <PrivateRoute path="/dashboard" component={Dashboard} />
        </Switch>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
