import {makeStyles} from "@mui/styles";

export const useStylesPages = makeStyles({
  spacingTop4: {
    paddingTop: "14px",
  },

  boxModal:{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  },
  

  //   login:{
  //     padding:'0px 10px 5px 10px',
  //   },

  //   avatar:{
  //       backgroundColor:'#039bef',
  //   },

  //   fieldError:{
  //     color:'red',
  //   },
});
