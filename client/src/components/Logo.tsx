import React from 'react';
import logo from '../assets/images/logo.png';

interface LogoProps {
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

const Logo: React.FC<LogoProps> = ({ onClick }) => {
  return <img src={logo} alt='logo' className='logo' onClick={onClick} />;
};

export default Logo;
