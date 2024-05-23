import React, { useState } from 'react';
import { useAuthContext } from '../context/authContext';
import { AxiosError } from 'axios';
import { message } from 'antd';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { client, setUserAndAuthClient } = useAuthContext();

  const register = async () => {
    try {
      setLoading(true);
      const response = await client.post('/auth/register', {
        email,
        password,
        name,
      });
      const { user, token } = response.data;
      message.success('Register successfully');
      setUserAndAuthClient(user, token);
    } catch (err) {
      const error = err as AxiosError;
      message.error((error.response!.data as any).msg);
    }
    setLoading(false);
  };

  return (
    <form>
      <h1>Create Account</h1>
      <input
        type='text'
        placeholder='Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={loading}
      />
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
      <button onClick={register} disabled={loading}>
        Sign Up
      </button>
    </form>
  );
};

export default SignUp;
