import React, { useEffect, useRef, useState } from 'react';
import Wrapper from '../assets/wrappers/UserCircle';
import { IoMdLogOut } from 'react-icons/io';
import { useAuthContext } from '../context/authContext';

interface UserCircleProps {
  className?: string;
}

const UserCircle: React.FC<UserCircleProps> = ({ className }) => {
  const [userPanel, setUserPanel] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const handleClickOutside = (event: MouseEvent) => {
    if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
      setUserPanel(false);
    }
  };
  useEffect(() => {
    if (userPanel) {
      document.addEventListener('mouseup', handleClickOutside);
    } else {
      document.removeEventListener('mouseup', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
    };
  }, [userPanel]);
  const { removeUser, user } = useAuthContext();
  return (
    <Wrapper className={className} ref={panelRef}>
      <img
        alt='avt'
        src={process.env.PUBLIC_URL + '/vergil_chair.jpg'}
        onClick={() => setUserPanel((show) => !show)}
      />
      <div className={userPanel ? 'imagine imagine-show' : 'imagine'}>
        <div className='user-name'>
          <img alt='avt' src={process.env.PUBLIC_URL + '/vergil_chair.jpg'} />
          <span>{user?.name}</span>
        </div>
        <div className='sep' />
        <div className='menu-setting'>
          <div className='menu-item' onClick={removeUser}>
            <IoMdLogOut className='icon' />
            <span className='text'>Logout</span>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default UserCircle;
