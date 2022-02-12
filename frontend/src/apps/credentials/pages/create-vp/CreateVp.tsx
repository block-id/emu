import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Box, Container } from '@mui/material';

import { getVpPayload } from 'apps/credentials/utils';
import IdService from 'apps/credentials/services/IdService';
import Card from 'apps/credentials/components/id-card/components/card/Card';

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

  return (
    <Container
      sx={(theme) => ({
        maxWidth: 'lg',
        padding: 0,
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
          }}
        >
          <Card
            id={credential.verifiable_id}
            highlightGroups={payload.attributeGroups}
            cancelUnhighlightedGroups
          />
        </Box>
      )}
    </Container>
  );
};

export default CreateVp;
