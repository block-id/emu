import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import {
  Box, Button, Container, Typography,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

import { getVpPayload } from 'apps/credentials/utils';
import IdService from 'apps/credentials/services/IdService';
import Card from 'apps/credentials/components/id-card/components/card/Card';
import VpAlert from 'apps/credentials/components/vp-alert/VpAlert';

const idService = new IdService();
const CreateVp: React.FC = () => {
  const payload = getVpPayload();
  const { id } = useParams();

  const [credential, setCredential] = useState<Id | null>(null);
  useEffect(() => {
    idService
      .getId(Number.parseInt(id as string))
      .then((response) => {
        setCredential(response.data);
      })
      .catch((error) => {
        alert(`Handle error!${error.message}`);
      });
  }, [id]);

  const navigate = useNavigate();
  const onCancel = () => {
    navigate('/');
  };

  const { search } = useLocation();
  const onSubmit = () => {
    navigate(`authenticate${search}`);
  };

  return (
    <>
      <VpAlert />
      <Container
        sx={(theme) => ({
          maxWidth: 'lg',
          padding: 0,
          display: 'flex',
          justifyContent: 'center',
          [theme.breakpoints.down('lg')]: {
            maxWidth: '100%',
          },
        })}
      >
        {credential && payload && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              marginTop: 2,
              gap: 2,
            }}
          >
            <Card
              id={credential.verifiable_id}
              highlightGroups={payload.attributeGroups}
              cancelUnhighlightedGroups
            />
            <Typography variant="body1">
              The striked-through attributes were not requested by the verifier.
              They will <strong>not be sent</strong>.
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 2,
              }}
            >
              <Button variant="outlined" onClick={onCancel}>Cancel</Button>
              <Button
                endIcon={<SendIcon fontSize="small" />}
                variant="contained"
                color="success"
                onClick={onSubmit}
              >
                Send ID to {payload.requesterName}
              </Button>
            </Box>
          </Box>
        )}
      </Container>
    </>
  );
};

export default CreateVp;
