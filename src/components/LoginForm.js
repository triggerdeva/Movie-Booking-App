// LoginForm.js
import React, { useState } from 'react';
import { signUpWithEmailAndPassword, loginWithEmailAndPassword } from '../firebase';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); // To toggle between login and sign-up

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // If isLogin is true, perform login
        await loginWithEmailAndPassword(email, password);
        // User is logged in
      } else {
        // If isLogin is false, perform sign-up
        await signUpWithEmailAndPassword(email, password);
        // User is signed up
      }
    } catch (error) {
      // Handle login/sign-up errors here
    }
  };

  return (
    <div>
      <h2>{isLogin ? 'Log In' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">{isLogin ? 'Log In' : 'Sign Up'}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Switch to Sign Up' : 'Switch to Log In'}
      </button>
    </div>
  );
};

export default LoginForm;
