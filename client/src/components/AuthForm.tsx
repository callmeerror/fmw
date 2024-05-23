import React, { useState } from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';
import ToggleAuthForm from './ToggleAuthForm';

const AuthForm: React.FC = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const handleToggle = () => {
    setIsSignIn(!isSignIn);
  };
  return (
    <div className={`container ${isSignIn ? '' : 'active'}`} id='container'>
      <div className='form-container sign-in'>
        <SignIn />
      </div>
      <div className='form-container sign-up'>
        <SignUp />
      </div>
      <ToggleAuthForm onToggle={handleToggle} />
    </div>
  );
};

export default AuthForm;
