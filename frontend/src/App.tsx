import React from 'react';
import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';

import Auth from 'apps/auth/Auth';
import { useUser } from 'common/providers/user-provider/UserProvider';
import Login from 'apps/auth/pages/login/Login';
import Credentials from 'apps/credentials/Credentials';

const App: React.FC = () => {
  const [user, setUser] = useUser();

  return (
    user === undefined
      ? <p>Replace me with a nice loading screen...</p>
      : (
        <BrowserRouter>
          <Routes>
            <Route path="auth" element={<Auth />}>
              <Route index element={<Login />} />
            </Route>
            {user && <Route path="" element={<Credentials />} />}
            {user === null && <Route path="" element={<Navigate to="auth" />} /> }
          </Routes>
        </BrowserRouter>
      )
  );
};

export default App;
