import React from 'react';
import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';

import Auth from 'apps/auth/Auth';
import { useUser } from 'common/providers/user-provider/UserProvider';
import Login from 'apps/auth/pages/login/Login';
import Credentials from 'apps/credentials/Credentials';
import Register from 'apps/auth/pages/register/Register';
import Loader from 'common/components/loader/Loader';

const App: React.FC = () => {
  const [user] = useUser();

  return (
    user === undefined ? <Loader />
      : (
        <BrowserRouter>
          <Routes>
            <Route path="auth" element={<Auth />}>
              <Route index element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
            {user && <Route path="" element={<Credentials />} />}
            {user === null && <Route path="" element={<Navigate to="auth" />} /> }
          </Routes>
        </BrowserRouter>
      )
  );
};

export default App;
