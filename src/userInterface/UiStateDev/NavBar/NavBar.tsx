// NavBar.tsx
import React from 'react';

import {
  Logo,
  MobileMenuIcon,
  NavBarStyle,
  NavLinks,
  ResponsiveNavLinks,
} from './NavBarStyles';

export const NavBar: React.FC = () => {
  const handleMenuClick = () => {
    alert('Mobile menu clicked! Add your logic here.');
  };

  return (
    <NavBarStyle>
      <Logo>Pixeltron</Logo>
      <ResponsiveNavLinks>
        <NavLinks>
          <div>Home</div>
          <div>About</div>
          <div>Contact</div>
        </NavLinks>
      </ResponsiveNavLinks>
      <MobileMenuIcon onClick={handleMenuClick}>☰</MobileMenuIcon>
    </NavBarStyle>
  );
};
