import React from 'react';
import { Box, Paper } from '@mui/material';

import Card from './components/card/Card';
import Toolbar from './components/Toolbar';

const IdCard: React.FC<IdCardProps> = ({ id, showDelete }) => (
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
        padding: theme.spacing(2),
        alignItems: 'center',
      })}
    >
      <Toolbar id={id} showDelete={showDelete} />
      <Card id={id.verifiable_id.data} />
    </Box>
  </Paper>
);

export default IdCard;
