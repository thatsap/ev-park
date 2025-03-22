import React, { useState } from 'react';

import {
  MenuItem,
  MenuLabel,
  SideBarStyle,
  ToggleButton,
} from './SideBarStyles'; // Import styles

export const SideBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <SideBarStyle isOpen={isOpen}>
      <ToggleButton isOpen={isOpen} onClick={toggleSidebar}>
        {isOpen ? '⟩' : '⟨'}
      </ToggleButton>
      <MenuItem isOpen={isOpen}>
        <i className="fas fa-tachometer-alt" />
        <MenuLabel isOpen={isOpen}>Dashboard</MenuLabel>
      </MenuItem>
      <MenuItem isOpen={isOpen}>
        <i className="fas fa-cog" />
        <MenuLabel isOpen={isOpen}>Settings</MenuLabel>
      </MenuItem>
      <MenuItem isOpen={isOpen}>
        <i className="fas fa-user" />
        <MenuLabel isOpen={isOpen}>Profile</MenuLabel>
      </MenuItem>
      <MenuItem isOpen={isOpen}>
        <i className="fas fa-sign-out-alt" />
        <MenuLabel isOpen={isOpen}>Logout</MenuLabel>
      </MenuItem>
    </SideBarStyle>
  );
};
