import React, { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { User } from './types';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loginError, setLoginError] = useState<string>('');

  const handleLogin = (username: string, password: string) => {
    // Demo credentials validation
    if (username === 'driverdemo' && password === '123456') {
      setUser({
        username,
        driver: {
          name: 'John Doe',
          id: 'DRV-1024',
        },
      });
      setLoginError('');
    } else {
      setLoginError('Invalid credentials. Please use the demo credentials provided.');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setLoginError('');
  };

  if (!user) {
    return <Login onLogin={handleLogin} error={loginError} />;
  }

  return <Dashboard user={user} onLogout={handleLogout} />;
}

export default App;