import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';

const Auth: React.FC = () => (
  <Container maxWidth="xs">
    <Outlet />
  </Container>
);

export default Auth;
