import React from 'react';
import { Box, Paper } from '@mui/material';

import Card from './components/card/Card';
import Toolbar from './components/Toolbar';

const IdCard: React.FC<IdCardProps> = ({ id }) => (
  <Paper
    sx={{
      width: '100%',
      marginTop: 2,
    }}
  >
    <Box
      sx={(theme) => ({
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        padding: theme.spacing(1),
      })}
    >
      <Toolbar id={id} />
      <Card id={id.verifiable_id} />
    </Box>
  </Paper>
);

export default IdCard;
