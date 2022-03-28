import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { getVpPayload } from 'apps/credentials/utils';
import VpAlert from 'apps/credentials/components/vp-alert/VpAlert';
import SendVp from 'apps/credentials/components/send-vp/SendVp';
import IdService from 'apps/credentials/services/IdService';
import Authenticate from 'common/components/authenticate/Authenticate';

const idService = new IdService();
const AuthenticateCreateVp: React.FC = () => {
  const payload = getVpPayload();
  const { id } = useParams();

  const [showSend, setShowSend] = useState(false);
  const [verifiablePresentation, setVerifiablePresenation] = useState<VerifiablePresentation | null>(null);
  const handleAuthenticate = (password: string) => {
    idService
      .createVp(Number.parseInt(id as string), {
        ...(payload as VpRequestPayload),
        password,
      })
      .then((response) => {
        setVerifiablePresenation(response.data);
        setShowSend(true);
      })
      .catch((err) => {
        console.log(err);
        alert('Handle error!');
      });
  };

  return (
    <>
      {showSend ? (
        <SendVp vp={verifiablePresentation as VerifiablePresentation} sendTo={payload?.sendTo as string} />
      ) : (
        <>
          <VpAlert />
          <Authenticate onSubmit={handleAuthenticate} />
        </>
      )}
    </>
  );
};

export default AuthenticateCreateVp;
