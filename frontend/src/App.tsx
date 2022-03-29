import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
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
import NewId from 'apps/credentials/pages/new-id/NewId';
import Signing from 'apps/auth/pages/signing/Signing';
import AuthenticateSigning from 'apps/auth/components/authenticate-signing/AuthenticateSigning';

const App: React.FC = () => {
  const [user] = useUser();

  return user === undefined ? (
    <Loader />
  ) : (
    <BrowserRouter>
      <Routes>
        <Route path="auth" element={<Auth />}>
          {/* Guest Routes */}
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* User Routes */}
        {user && (
          <>
            {/* Signing */}
            <Route path="auth/sign" element={<Outlet />}>
              <Route index element={<Signing />} />
              <Route path="authenticate" element={<AuthenticateSigning />} />
            </Route>
            {/* Ids */}
            <Route path="ids" element={<Credentials />}>
              <Route index element={<IdList />} />
            </Route>
            <Route path="create-vp" element={<Outlet />}>
              <Route index element={<SelectCreateVp />} />
              <Route path=":id" element={<CreateVp />} />
              <Route
                path=":id/authenticate"
                element={<AuthenticateCreateVp />}
              />
            </Route>
            <Route path="new-id" element={<NewId />} />
          </>
        )}

        {/* Redirects */}
        {user && <Route path="" element={<Navigate to="ids" />} />}
        {user === null && <Route path="*" element={<Navigate to="auth" />} />}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
