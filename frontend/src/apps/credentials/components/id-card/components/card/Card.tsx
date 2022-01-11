import React from 'react';
import { Avatar, Box, Typography } from '@mui/material';

const Card: React.FC<{id: VerifiableId}> = ({ id }) => (
  <Box
    sx={(theme) => (
      {
        display: 'flex',
        flexDirection: 'column',
        width: '800px',
        minHeight: '300px',
        border: `1px solid ${theme.palette.grey[200]}`,
        marginTop: 2,
        position: 'relative',
        padding: theme.spacing(2),
      }
    )}
  >
    <Box
      sx={(theme) => ({
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        zIndex: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.4,
        backgroundColor: theme.palette.grey[200],
      })}
    >
      <Avatar
        src={id.issuer.logo}
        alt="Issuer logo"
        sx={{
          width: 150,
          height: 150,
        }}
      />
    </Box>
    <Box sx={{ zIndex: 1 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h6">{id.issuer.name}</Typography>
        <Typography variant="h6">{id.idName}</Typography>
      </Box>
    </Box>
  </Box>
);

export default Card;
