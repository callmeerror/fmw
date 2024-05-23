import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/authContext';
import { message } from 'antd';
import { AxiosError } from 'axios';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { client, setUserAndAuthClient } = useAuthContext();

  const login = async () => {
    try {
      setLoading(true);
      const response = await client.post('/auth/login', { email, password });
      const { user, token } = response.data;
      message.success('Login successfully');
      setUserAndAuthClient(user, token);
    } catch (err) {
      const error = err as AxiosError;
      message.error((error.response!.data as any).msg);
    }
    setLoading(false);
  };

  return (
    <form>
      <h1>Sign In</h1>
      <input
        type='email'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
      />
      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
      />
      <Link to='#'>Forget Your Password?</Link>
      <button disabled={loading} onClick={login}>
        Sign In
      </button>
    </form>
  );
};

export default SignIn;
