import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo, NavBarStyle, NavLinks } from './NavBarStyles';
import { useMainContext } from '../../../hook/useMainContext';
import { observer } from 'mobx-react-lite';

export const NavBar: React.FC = observer(() => {
  const { authManager, viewManager } = useMainContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    authManager.logout();
    navigate('/');
  };

  const handleStartRide = () => {
    viewManager.setDistance(true);
  };

  return (
    <NavBarStyle>
      <Logo>Ev Park</Logo>
      <NavLinks>
        <div onClick={handleStartRide} style={{ cursor: 'pointer' }}>
          Start Ride
        </div>
        <div onClick={handleLogout} style={{ cursor: 'pointer' }}>
          Logout
        </div>
      </NavLinks>
    </NavBarStyle>
  );
});
