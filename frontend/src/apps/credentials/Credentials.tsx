import React from 'react';
import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

const Credentials: React.FC = () => (
  <Container maxWidth="lg">
    <Outlet />
  </Container>
);

export default Credentials;
