import {
    createMuiTheme
} from '@material-ui/core';

//fonts
export const primaryFont =  "'Open Sans', sans-serif";
export const secondaryFont =  "'Permanent Marker', sans-serif";

//colors
//charlotte
export const chaPurple = "rgb(29,17,96)";
export const chaTeal = "rgb(0,120,140)";
export const chaGray = "rgb(161,161,164)";
export const chaPrimaryColor = chaPurple;
export const chaSecondaryColor = chaTeal;

// minnesota
export const minDarkBlue = "rgb(12, 35, 64)";
export const minLightBlue = "rgb(35, 97, 146)";
export const minGray = "rgb(158, 162, 162)";
export const minGreen = "rgb(120, 190, 32)";
export const minPrimaryColor = minDarkBlue;
export const minSecondaryColor = minLightBlue;

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