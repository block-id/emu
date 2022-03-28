import React from 'react';
import {
  Box, Button, Container, Typography,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { getQueryParam } from 'common/utils/queryParams';

const Signing: React.FC = () => {
  const payload = getQueryParam('payload') || '';
  const redirect = getQueryParam('redirect') || '';

  const { search } = useLocation();
  const navigate = useNavigate();

  if (payload?.trim().length < 1 || redirect?.trim().length < 1) {
    return <p>Invalid payload or redirect</p>;
  }

  return (
    <Container
      sx={(theme) => ({
        maxWidth: 'lg',
        padding: 0,
        display: 'flex',
        justifyContent: 'center',
        marginTop: 10,
        [theme.breakpoints.down('lg')]: {
          maxWidth: '100%',
        },
      })}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          alignItems: 'center',
        }}
      >
        <Typography variant="h4">Signing A Challenge</Typography>
        <Typography variant="body1">
          You are about to sign a challenge ({payload}) and return to {redirect}
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            navigate(`/auth/sign/authenticate${search}`);
          }}
        >Sign
        </Button>
      </Box>
    </Container>
  );
};

export default Signing;
