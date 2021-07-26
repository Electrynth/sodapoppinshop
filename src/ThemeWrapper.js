import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/styles'
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const themes = {
  palettes: {
    dark: {
      type: 'dark',
      primary: { main: '#fafafa' },
      secondary: { main: '#1F2125' },
      background: { default: '#141414' },
    },
    light: {
      type: 'light',
      primary: { main: '#1e2125' },
      secondary: { main: '#fff' },
      background: { default: '#fff' }
    }
  }
};


function ThemeWrapper({ children, themeColor }) {
  const theme = responsiveFontSizes(createMuiTheme({
    typography: { useNextVariants: true },
    palette: themes.palettes[themeColor]
  }));
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

export default ThemeWrapper;
