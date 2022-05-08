import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import {
  Alert,
  Box, Button, Container, Typography,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate } from 'react-router-dom';

import { getQueryParam } from 'common/utils/queryParams';
import Card from 'apps/credentials/components/id-card/components/card/Card';
import IdService from 'apps/credentials/services/IdService';

const idService = new IdService();
const NewId: React.FC = () => {
  const idUrl = getQueryParam('idUrl');
  const [id, setId] = useState<VerifiableId | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!idUrl) return;
    if (!isLoading) return;

    Axios.get(idUrl)
      .then((response) => {
        if (typeof response.data === 'string') {
          setId(JSON.parse(response.data));
        } else {
          setId(response.data);
        }
        setIsLoading(false);
        setError(null);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [idUrl, isLoading]);

  const navigate = useNavigate();
  const onSubmit = () => {
    idService.createId(id as VerifiableId).then(() => {
      navigate('/ids/');
    }).catch((err) => {
      alert(`Could not create new ID: ${err.message}`);
    });
  };
  const onCancel = () => {
    navigate('/');
  };

  if (!idUrl) return <p>Invalid query params</p>;
  return (
    <>
      {isLoading ? <p>Loding...</p> : (
        <>
          {error ? <p>Error: {error.message}</p> : (
            <>
              <Alert severity="info">You are adding a new ID to your wallet!</Alert>
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
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginTop: 2,
                    gap: 2,
                  }}
                >
                  {id
                && <Card id={id.data} />}
                  <Typography variant="body1">
                    Do you want to add this ID to your wallet?
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
                      endIcon={<AddCircleIcon fontSize="small" />}
                      variant="contained"
                      color="success"
                      onClick={onSubmit}
                    >
                      Add
                    </Button>
                  </Box>
                </Box>
              </Container>
            </>
          )}
        </>
      )}
    </>
  );
};

export default NewId;
