import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';

import { useUser } from 'common/providers/user-provider/UserProvider';

const Auth: React.FC = () => {
  const [user] = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  return (
    <Container maxWidth="xs">
      <Outlet />
    </Container>
  );
};

export default Auth;
