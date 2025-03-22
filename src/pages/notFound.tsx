import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';

import { NavigationRoutes } from '../constant';

// Container component with a gradient background
const NotFoundContainer = styled(Box)(() => ({
  '@keyframes gradient': {
    '0%': { backgroundPosition: '0% 50%' },
    '100%': { backgroundPosition: '0% 50%' },
    '50%': { backgroundPosition: '100% 50%' },
  },
  alignItems: 'center',
  animation: 'gradient 3s ease infinite',
  background: 'linear-gradient(135deg, #ff0066, #ff6600)',
  backgroundSize: '400% 400%',
  borderRadius: '2rem',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
  display: 'flex',
  flexDirection: 'column',
  fontFamily: '"Comic Sans MS", cursive, sans-serif',
  height: '100vh',
  justifyContent: 'center',
  overflow: 'hidden',
  padding: '3rem',
  position: 'relative',
  textAlign: 'center',
  width: '100%',
}));

// Title with bounce effect
const Title = styled(Typography)(() => ({
  '@keyframes bounce': {
    '0%': { transform: 'scale(1) translateY(0)' },
    '100%': { transform: 'scale(1) translateY(0)' },
    '50%': { transform: 'scale(1.1) translateY(-10px)' },
  },
  animation: 'bounce 1.5s infinite alternate',
  color: 'white',
  fontSize: '6rem',
  textShadow: '0 0 15px rgba(0, 0, 0, 0.3)',
  transformOrigin: 'center',
}));

// Subtitle with floating effect
const Subtitle = styled(Typography)(() => ({
  '@keyframes float': {
    '0%': { transform: 'translateY(0)' },
    '100%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(-10px)' },
  },
  animation: 'float 2s ease-in-out infinite',
  color: 'white',
  fontSize: '2rem',
  letterSpacing: '2px',
  marginTop: '20px',
  textShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
}));

// Button component styled
const HomeButton = styled(Button)(() => ({
  '&:hover': {
    transform: 'scale(1.1)',
  },
  backgroundColor: '#ff0066',
  borderRadius: '50px',
  boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
  color: 'white',
  fontSize: '1.5rem',
  fontWeight: 'bold',
  marginTop: '30px',
  padding: '10px 20px',
  transition: 'all 0.3s ease',
}));

export const NotFound = () => {
  return (
    <NotFoundContainer>
      <Title variant="h1">404 - Not Found!</Title>
      <Subtitle variant="h2">Ahan!!! Where to?</Subtitle>
      <HomeButton variant="contained" href={NavigationRoutes.User}>
        Go Back Home
      </HomeButton>
    </NotFoundContainer>
  );
};
