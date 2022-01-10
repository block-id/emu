import React from 'react';
import {
  Avatar,
  Box, Chip, IconButton, Tooltip, Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const Toolbar: React.FC<{id: Id}> = ({ id }) => {
  const verifiableId = id.verifiable_id;
  const addedOn = dayjs(id.created_at);

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Avatar
          src={verifiableId.issuer.logo}
          sx={{ width: 50, height: 50 }}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            marginLeft: 1,
          }}
        >
          <Typography variant="h6">
            {`${verifiableId.issuer.name} / ${verifiableId.idName}`}
          </Typography>
          <Box>
            <Chip
              label={`Added: ${addedOn.fromNow()}`}
              variant="outlined"
              color="success"
              size="small"
            />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Tooltip title="Create Verifiable Presentation">
          <IconButton>
            <HistoryEduIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default Toolbar;
