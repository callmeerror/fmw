import React from 'react';
import Wrapper from '../assets/wrappers/Authentication';
import AuthForm from '../components/AuthForm';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/authContext';

interface AuthenticationProps {}

const Authentication: React.FC<AuthenticationProps> = () => {
  const { user } = useAuthContext();

  if (user) {
    return <Navigate to='/' />;
  }

  return (
    <Wrapper>
      <AuthForm />
    </Wrapper>
  );
};

export default Authentication;
