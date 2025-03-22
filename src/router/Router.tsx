import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { NavigationRoutes } from '../constant';
import { Developer } from '../pages/developer';
import { NotFound } from '../pages/notFound';
import { User } from '../pages/user';
import AuthPage from '../components/Login/Signup/AuthPage';
import { useMainContext } from '../hook/useMainContext';

export const Router = () => {
  const { authManager } = useMainContext();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />{' '}
        {/* Default to login/signup */}
        <Route
          path="/maps"
          element={authManager.isAuthenticated ? <User /> : <Navigate to="/" />}
        />{' '}
        {/* Protected maps route */}
        <Route path={NavigationRoutes.NotFound} element={<AuthPage />} />
        <Route path={NavigationRoutes.Developer} element={<Developer />} />
        <Route path={NavigationRoutes.User} element={<User />} />
        <Route path="/auth" element={<Navigate to="/" />} />{' '}
        {/* Redirect /auth to / */}
      </Routes>
    </BrowserRouter>
  );
};
