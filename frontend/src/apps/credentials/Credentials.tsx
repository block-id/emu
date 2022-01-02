import React from 'react';
import { useUser } from 'common/providers/user-provider/UserProvider';
import AuthService from 'apps/auth/services/AuthService';

const authService = new AuthService();
const Credentials: React.FC = () => {
  const [user, setUser] = useUser();

  return (
    <>
      <p>Your credentials will be listed here.</p>
      <button
        onClick={() => {
          authService.logout().then(() => {
            setUser(null);
          });
        }}
        type="button"
      >
        Logout
      </button>
    </>
  );
};

export default Credentials;
