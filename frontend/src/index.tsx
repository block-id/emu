import React from 'react';
import ReactDOM from 'react-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import App from 'App';
import { UserProvider } from 'common/providers/user-provider/UserProvider';
import DialogProvider from 'common/providers/dialog-provider/DialogProvider';

const theme = createTheme({
  components: {
    MuiAvatar: {
      styleOverrides: {
        root: {
          '.MuiAvatar-img': {
            objectFit: 'contain',
          },
        },
      },
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <DialogProvider>
        <UserProvider>
          <CssBaseline />
          <App />
        </UserProvider>
      </DialogProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
