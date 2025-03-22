// Navbar.styles.ts
import { styled } from '@mui/material/styles';

// Styles for the Navbar
export const NavBarStyle = styled('div')(() => ({
  alignItems: 'center',
  // Padding inside the navbar
  background: 'linear-gradient(135deg, #00b4d8, #0096c7)',

  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',

  boxSizing: 'border-box',

  // Gradient background
  color: '#FFFFFF',
  display: 'flex',
  // Prevents any child elements from overflowing
  fontFamily: "'Poppins', sans-serif",

  // Ensures it takes up the full width of the screen
  height: '70px',
  justifyContent: 'space-between',

  left: 0,
  // Includes padding and border in width/height calculations
  overflow: 'hidden',
  padding: '0 20px',

  position: 'fixed',
  top: 0,
  transition: 'background-color 0.3s ease',

  width: '100%',
  zIndex: 1000, // Smooth background transition
}));

// Styles for the Logo
export const Logo = styled('div')(() => ({
  '&:hover': {
    transform: 'scale(1.1)', // Slightly enlarge logo on hover
  },

  // Uppercase letters for a bold look
  cursor: 'pointer',
  fontSize: '1.8rem',
  fontWeight: '700',

  // Make logo bold
  letterSpacing: '1.5px',
  // Prevents wrapping of text
  textTransform: 'uppercase',
  // Makes the logo clickable
  transition: 'transform 0.2s ease-in-out',

  whiteSpace: 'nowrap',
}));

// Styles for the NavLinks
export const NavLinks = styled('div')(() => ({
  // Smooth transition for scaling
  '& div': {
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      color: '#00b4d8',
      transform: 'scale(1.1)', // Change color on hover
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
  // Slightly lighter font weight for links
  transition: 'transform 0.3s ease',
}));

// Styles for responsive navbar links (hidden on mobile)
export const ResponsiveNavLinks = styled('div')(() => ({
  '@media (max-width: 768px)': {
    display: 'none', // Hide navigation links on smaller screens
  },
  display: 'flex',
}));

// Styles for the Mobile Menu Icon (only visible on mobile)
export const MobileMenuIcon = styled('div')(() => ({
  '&:hover': {
    transform: 'rotate(90deg)', // Add some rotation to the icon on hover
  },
  '@media (max-width: 768px)': {
    display: 'block', // Show menu icon only on smaller screens
  },
  color: '#FFFFFF',
  cursor: 'pointer',
  display: 'none',
  fontSize: '1.8rem',
  transition: 'transform 0.3s ease-in-out',
}));
