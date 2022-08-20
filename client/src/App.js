import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import ChangePasswordPage from './pages/ChangePasswordPage';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import AuthContext from './store/auth-context';
import ApplyingPage from './pages/ApplyPage';
import ProfilePage from './pages/ProfilePage';
import CasePage from './pages/CasePage';
import FavoritesPage from './pages/Favorites';

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Routes>
        <Route path='/' exact element ={<HomePage />}/>

        {!authCtx.isLoggedIn && (
          <Route path='/auth' element={<AuthPage />}/>
        )}

        <Route path='/favourite' element=
          {authCtx.isLoggedIn ? <FavoritesPage />: <Navigate to="/" replace/>}/>

        <Route path='/apply' element=
          {authCtx.isLoggedIn ? <ApplyingPage />: <Navigate to="/" replace/>}/>

        <Route path='/profile' element=
          {authCtx.isLoggedIn ? <ProfilePage />: <Navigate to="/" replace/>}/>

        <Route path='/case' element=
          {authCtx.isLoggedIn ? <CasePage />: <Navigate to="/" replace/>}/>

        <Route path='/changepassword' element=
          {authCtx.isLoggedIn ? <ChangePasswordPage />: <Navigate to="/" replace/>}/>
        <Route path="*" element={<Navigate to="/" replace/>} />
      </Routes>
    </Layout>
  );
}

export default App;
