import React from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import LoginForm from 'apps/auth/components/login/LoginForm';

const Login: React.FC = () => (
  <Box
    sx={{
      marginTop: 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
  >
    <Avatar sx={{ mb: 2, bgcolor: 'secondary.main' }}>
      <LockOutlinedIcon fontSize="medium" />
    </Avatar>
    <Typography variant="h5">Login</Typography>
    <LoginForm />
  </Box>
);

export default Login;
