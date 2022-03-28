import React from 'react';

import { getQueryParam } from 'common/utils/queryParams';
import Authenticate from 'common/components/authenticate/Authenticate';
import AuthService from 'apps/auth/services/AuthService';

const authService = new AuthService();
const AuthenticateSigning: React.FC = () => {
  const payload = getQueryParam('payload') || '';
  const redirect = getQueryParam('redirect') || '';

  const handleAuthenticate = async (password: string) => {
    try {
      const response = await authService.sign(payload, password);
      const { sign, publicKey } = response.data;
      window.location.href = `${redirect}?sign=${sign}&publicKey=${publicKey}`;
    } catch (e: any) {
      alert(`Could not sign message: ${e.message} ${e.response?.data?.toString()}`);
    }
  };

  return <Authenticate onSubmit={handleAuthenticate} />;
};

export default AuthenticateSigning;
