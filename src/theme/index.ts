import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#007bff',
    },
    text: {
      primary: '#29313A',
      secondary: '#677A90',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F8FAFC',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    h1: {
      fontSize: '24px',
      fontWeight: 500,
      lineHeight: 1.75,
      color: '#29313A',
    },
    h2: {
      fontSize: '16px',
      fontWeight: 500,
      lineHeight: 1.5,
      color: '#29313A',
    },
    body1: {
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: 1.25,
      color: '#29313A',
    },
    body2: {
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: 1.25,
      color: '#677A90',
    },
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 500,
          color: '#29313A',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});