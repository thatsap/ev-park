import { styled } from '@mui/material/styles';

// EV-inspired gradient sidebar style
export const SideBarStyle = styled('div', {
  shouldForwardProp: (prop) => prop !== 'isOpen',
})<{ isOpen: boolean }>(({ isOpen }) => ({
  alignItems: 'center',
  background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
  boxShadow: '-2px 0px 10px rgba(0, 0, 0, 0.4)',
  color: '#ECF0F1',
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  paddingTop: '20px',
  position: 'fixed',
  right: 0,
  top: '70px', // Positioned below your navbar
  transition: 'width 0.3s ease',
  width: isOpen ? '250px' : '50px',
  zIndex: 999,
}));

// Toggle button with a futuristic touch
export const ToggleButton = styled('button', {
  shouldForwardProp: (prop) => prop !== 'isOpen',
})<{ isOpen: boolean }>(({ isOpen }) => ({
  '&:hover': {
    transform: 'scale(1.1)',
  },
  alignItems: 'center',
  backgroundColor: '#1ABC9C',
  border: 'none',
  borderRadius: '50%',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
  color: '#2C3E50',
  cursor: 'pointer',
  display: 'flex',
  fontSize: '1.5rem',
  height: '40px',
  justifyContent: 'center',
  position: 'absolute',
  left: isOpen ? '-20px' : '-20px',
  top: '10px',
  transition: 'left 0.3s ease, transform 0.3s ease',
  width: '40px',
}));

// Status item style—no clicking allowed here, so keep those fingers off!
export const StatusItem = styled('div', {
  shouldForwardProp: (prop) => prop !== 'isOpen',
})<{ isOpen: boolean }>(({ isOpen }) => ({
  display: 'flex',
  alignItems: 'center',
  margin: '15px 0',
  padding: isOpen ? '10px 20px' : '10px',
  transition: 'all 0.3s ease',
  width: '100%',
}));

// Status icon style
export const StatusIcon = styled('i')(() => ({
  fontSize: '1.2rem',
}));

// Label style that disappears when the sidebar is closed
export const StatusLabel = styled('span', {
  shouldForwardProp: (prop) => prop !== 'isOpen',
})<{ isOpen: boolean }>(({ isOpen }) => ({
  display: isOpen ? 'inline' : 'none',
  marginLeft: '10px',
  fontWeight: 500,
}));

// Style for the status value
export const StatusValue = styled('span')(() => ({
  marginLeft: 'auto',
  fontWeight: 700,
  color: '#1ABC9C',
}));
