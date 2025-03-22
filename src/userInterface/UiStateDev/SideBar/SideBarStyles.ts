import { styled } from '@mui/material/styles';

// Sidebar style
export const SideBarStyle = styled('div', {
  shouldForwardProp: (prop) => prop !== 'isOpen',
})<{ isOpen: boolean }>(({ isOpen }) => ({
  alignItems: 'center',
  backgroundColor: '#34495E',
  boxShadow: '-2px 0px 10px rgba(0, 0, 0, 0.3)',
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  paddingTop: '20px',
  position: 'fixed',
  right: 0,
  top: '70px',

  // Below the navbar
  transition: 'width 0.3s ease',
  // Sidebar on the right edge
  width: isOpen ? '250px' : '20px',
  zIndex: 999,
}));

// Toggle button style
export const ToggleButton = styled('button', {
  shouldForwardProp: (prop) => prop !== 'isOpen',
})<{ isOpen: boolean }>(({ isOpen }) => ({
  '&:hover': {
    transform: 'scale(1.1)',
  },
  alignItems: 'center',
  backgroundColor: '#2C3E50',
  border: 'none',
  borderRadius: '50%',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
  color: 'white',
  cursor: 'pointer',
  display: 'flex',
  fontSize: '1.5rem',
  height: '40px',
  justifyContent: 'center',
  left: isOpen ? '-15px' : '-15px',
  position: 'absolute',
  top: '10px',
  transform: 'translateY(0)',
  transition: 'left 0.3s ease, transform 0.3s ease',
  width: '40px',
}));

// Menu item style
export const MenuItem = styled('div', {
  shouldForwardProp: (prop) => prop !== 'isOpen',
})<{ isOpen: boolean }>(({ isOpen }) => ({
  '&:hover': {
    backgroundColor: '#1ABC9C',
    color: 'white',
  },
  borderRadius: '5px',
  boxSizing: 'border-box',
  cursor: 'pointer',
  fontSize: '1rem',
  margin: '15px 0',
  overflow: 'hidden',
  padding: isOpen ? '10px 20px' : '10px',
  textAlign: 'left',
  transition: 'background-color 0.3s ease, color 0.3s ease',
  whiteSpace: 'nowrap',
  width: '100%',
}));

// Menu label style
export const MenuLabel = styled('span', {
  shouldForwardProp: (prop) => prop !== 'isOpen',
})<{ isOpen: boolean }>(({ isOpen }) => ({
  display: isOpen ? 'inline' : 'none',
  marginLeft: '10px',
}));
