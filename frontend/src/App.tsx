import React from 'react';
import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';

import Auth from 'apps/auth/Auth';
import { useUser } from 'common/providers/user-provider/UserProvider';

const App: React.FC = () => {
  const [user, setUser, isLoaded] = useUser();

  console.log(user, isLoaded);
  return (
    !isLoaded ? <p>Replace me with a nice loading screen...</p> : (
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          {isLoaded && !user && <Route path="" element={<Navigate to="/auth" />} /> }
        </Routes>
      </BrowserRouter>
    )
  );
};

export default App;
