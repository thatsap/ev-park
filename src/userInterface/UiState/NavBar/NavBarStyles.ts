import { styled } from '@mui/material/styles';

// Styles for the Navbar
export const NavBarStyle = styled('div')(() => ({
  alignItems: 'center',
  background: 'linear-gradient(135deg, #2ECC71, #27AE60)', // Green gradient for eco-friendly feel
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
  boxSizing: 'border-box',
  color: '#FFFFFF',
  display: 'flex',
  fontFamily: "'Poppins', sans-serif",
  height: '70px',
  justifyContent: 'space-between',
  left: 0,
  overflow: 'hidden',
  padding: '0 20px',
  position: 'fixed',
  top: 0,
  transition: 'background-color 0.3s ease',
  width: '100%',
  zIndex: 1000,
}));

// Styles for the Logo
export const Logo = styled('div')(() => ({
  '&:hover': {
    transform: 'scale(1.1)', // Slight animation on hover
  },
  cursor: 'pointer',
  fontSize: '1.8rem',
  fontWeight: '700',
  letterSpacing: '1.5px',
  textTransform: 'uppercase',
  transition: 'transform 0.2s ease-in-out',
  whiteSpace: 'nowrap',
}));

// Styles for the NavLinks
export const NavLinks = styled('div')(() => ({
  '& div': {
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      color: '#2ECC71',
      transform: 'scale(1.1)',
    },
    borderRadius: '5px',
    cursor: 'pointer',
    padding: '8px 15px',
    transition:
      'background-color 0.3s ease, transform 0.2s ease, color 0.3s ease',
  },
  alignItems: 'center',
  display: 'flex',
  fontSize: '1.1rem',
  fontWeight: '500',
  gap: '20px',
  transition: 'transform 0.3s ease',
}));
