import React from "react";
import {
  jssPreset,
  ThemeProvider,
  createMuiTheme,
  StylesProvider,
  Theme,
} from "@material-ui/core/styles";
import { create } from "jss";
import jssRtl from "jss-rtl";
import CssBaseLine from '@material-ui/core/CssBaseline';

const jss = create({plugins:[...jssPreset().plugins, jssRtl()]});
const theme:Theme = createMuiTheme({
  palette:{
    background:{
      default:'#f5f5f5'
    }
  },
  direction:'rtl',
  typography:{
    fontFamily:'iranyekan'
  },
  overrides:{
     MuiCssBaseline:{
       "@global":{
         body:{
          padding:'50px'
         }
       }
     }
  }
})

 export default  function RTL(props:React.PropsWithChildren<{}>) {
  return (
    <StylesProvider jss={jss}>
      <ThemeProvider theme={theme}>
        <CssBaseLine/>
        {props.children}
      </ThemeProvider>
    </StylesProvider>
  );
}
