import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {
  Box, Button, CircularProgress, Typography,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import Card from 'apps/credentials/components/id-card/components/card/Card';
import { useUser } from 'common/providers/user-provider/UserProvider';

const SendVp: React.FC<{ sendTo: string; vp: VerifiablePresentation }> = ({
  sendTo,
  vp,
}) => {
  const [user] = useUser();

  const [sending, setSending] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (sending) {
      Axios.post(
        sendTo as string,
        vp, { params: { public_key: user.public_key } },
      )
        .then((response) => {
          setSending(false);
        })
        .catch((err) => {
          setSending(false);
          setError(err);
          console.log(err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sending]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <Card id={vp.data.id} />
      {sending && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <CircularProgress color="success" />
          <Typography variant="body1">
            Sending verifiable presentation to {sendTo}
          </Typography>
        </Box>
      )}
      {error && !sending && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="body1" color="error">
            An error occured while sending VP: {error.message}
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              setError(null);
              setSending(true);
            }}
          >
            Retry
          </Button>
        </Box>
      )}
      {!sending && !error && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <CheckCircleIcon fontSize="large" color="success" />
          <Typography variant="body1">
            VP was successfuly sent to {sendTo}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default SendVp;
