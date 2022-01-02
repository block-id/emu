import React from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import VerifiedUserOutlined from '@mui/icons-material/VerifiedUserOutlined';
import RegisterForm from 'apps/auth/components/register/RegisterForm';

const Register: React.FC = () => (
  <Box
    sx={{
      marginTop: 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
  >
    <Avatar sx={{ mb: 2, bgcolor: 'secondary.main' }}>
      <VerifiedUserOutlined fontSize="medium" />
    </Avatar>
    <Typography variant="h5">Register</Typography>
    <RegisterForm />
  </Box>
);

export default Register;
