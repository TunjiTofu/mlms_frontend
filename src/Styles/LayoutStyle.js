import {makeStyles} from "@mui/styles";

export const useStylesLayout = makeStyles((theme) => {
    return {
      page: {
        // background: "#f9f9f9",
        width: "100%",
        padding: theme.spacing(3),
      },
      title: {
        padding: theme.spacing(2),
      },
      toolbar: theme.mixins.toolbar,
    };
  });