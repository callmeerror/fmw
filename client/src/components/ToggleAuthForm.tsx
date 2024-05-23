import React from 'react';

interface ToggleAuthFormProps {
  onToggle: () => void;
}

const ToggleAuthForm: React.FC<ToggleAuthFormProps> = ({
  onToggle,
}) => {
  return (
    <div className='toggle-container'>
      <div className='toggle'>
        <div className='toggle-panel toggle-left'>
          <h1>Welcome Back!</h1>
          <p>Enter your personal details to use all of site features</p>
          <button className='hidden' onClick={onToggle}>
            Sign In
          </button>
        </div>
        <div className='toggle-panel toggle-right'>
          <h1>Hello, Friend!</h1>
          <p>Register with your personal details to use all of site features</p>
          <button className='hidden' onClick={onToggle}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToggleAuthForm;
