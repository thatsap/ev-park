import React from 'react';
import { observer } from 'mobx-react-lite';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useMainContext } from '../../../hook/useMainContext';
import './AuthPage.css';

const AuthPage: React.FC = observer(() => {
  const { enqueueSnackbar } = useSnackbar();
  const { authManager } = useMainContext();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (authManager.isLogin) {
      const success = authManager.login();
      if (success) {
        // enqueueSnackbar('Login successful!', { variant: 'success' });
        navigate('/user');
      } else {
        enqueueSnackbar('Invalid email or password', { variant: 'error' });
      }
    } else {
      const success = authManager.signup();
      if (success) {
        enqueueSnackbar('Signup successful!', { variant: 'success' });
        navigate('/maps');
      } else {
        enqueueSnackbar('Email already registered', { variant: 'error' });
      }
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="container">
        <h1 className="title">
          EV <span>Rent</span>
        </h1>
        <p className="subtitle">
          Your journey to electric mobility starts here
        </p>
        <div className="tab">
          <button
            className={authManager.isLogin ? 'tablink active' : 'tablink'}
            onClick={authManager.toggleForm}>
            Login
          </button>
          <button
            className={!authManager.isLogin ? 'tablink active' : 'tablink'}
            onClick={authManager.toggleForm}>
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {!authManager.isLogin && (
            <div className="input-group">
              <input
                type="text"
                placeholder="Full Name"
                value={authManager.fullName}
                onChange={(e) => authManager.setFullName(e.target.value)}
                required
                className="input-field"
              />
            </div>
          )}
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={authManager.email}
              onChange={(e) => authManager.setEmail(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={authManager.password}
              onChange={(e) => authManager.setPassword(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <button type="submit" className="submit-btn">
            {authManager.isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="switch">
          {authManager.isLogin ? (
            <>
              Don't have an account?{' '}
              <a
                href="#"
                onClick={authManager.toggleForm}
                className="switch-link">
                Sign Up
              </a>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <a
                href="#"
                onClick={authManager.toggleForm}
                className="switch-link">
                Login
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
});

export default AuthPage;
