import React from 'react';
import { Alert, AlertTitle } from '@mui/material';

import { getVpPayload } from 'apps/credentials/utils';

const VpAlert: React.FC = () => {
  const payload = getVpPayload();
  return (
    <>
      {payload && (
        <Alert severity="info">
          <AlertTitle>You're Creating a VP!</AlertTitle>
          You're creating a
          {' '}
          <strong>V</strong>
          erifiable
          {' '}
          <strong>P</strong>
          resentation that'll be submitted to
          {' '}
          <strong>{payload.sendTo}</strong>
          . VP requested by:
          {' '}
          <strong>{payload.requesterName}</strong>
        </Alert>
      )}
    </>
  );
};

export default VpAlert;
