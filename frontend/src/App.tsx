import React from 'react';
import {
  BrowserRouter, Routes, Route, Navigate, Outlet,
} from 'react-router-dom';

import Auth from 'apps/auth/Auth';
import { useUser } from 'common/providers/user-provider/UserProvider';
import Login from 'apps/auth/pages/login/Login';
import Credentials from 'apps/credentials/Credentials';
import Register from 'apps/auth/pages/register/Register';
import Loader from 'common/components/loader/Loader';
import IdList from 'apps/credentials/pages/id-list/IdList';
import SelectCreateVp from 'apps/credentials/pages/select-create-vp/SelectCreateVp';
import CreateVp from 'apps/credentials/pages/create-vp/CreateVp';
import AuthenticateCreateVp from 'apps/credentials/pages/authenticate-create-vp/AuthenticateCreateVp';

const App: React.FC = () => {
  const [user] = useUser();

  return user === undefined ? (
    <Loader />
  ) : (
    <BrowserRouter>
      <Routes>
        {/* Guest Routes */}
        <Route path="auth" element={<Auth />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* User Routes */}
        {user && (
          <>
            <Route path="ids" element={<Credentials />}>
              <Route index element={<IdList />} />
            </Route>
            <Route path="create-vp" element={<Outlet />}>
              <Route index element={<SelectCreateVp />} />
              <Route path=":id" element={<CreateVp />} />
              <Route path=":id/authenticate" element={<AuthenticateCreateVp />} />
            </Route>
          </>
        )}

        {/* Redirects */}
        {user && <Route path="" element={<Navigate to="ids" />} />}
        {user === null && <Route path="" element={<Navigate to="auth" />} />}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
