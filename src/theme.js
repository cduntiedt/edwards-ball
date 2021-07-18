import {
    createMuiTheme
  } from '@material-ui/core';

export const primaryFont =  "'Open Sans', sans-serif";
export const secondaryFont =  "'Permanent Marker', sans-serif";
export const theme = createMuiTheme({
  typography: {
    fontFamily: primaryFont,
    h1:{
      fontFamily: secondaryFont
    },
    h2:{
      fontFamily: secondaryFont
    },
    h3:{
      fontFamily: secondaryFont
    },
    h4:{
      fontFamily: secondaryFont
    },
    h5:{
      fontFamily: secondaryFont
    },
    h6:{
      fontFamily: secondaryFont
    }
  }
});