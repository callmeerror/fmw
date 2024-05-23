import React from 'react';
import Wrapper from '../assets/wrappers/Sidebar';
import { NavLink } from 'react-router-dom';
import { FaBookDead, FaBookmark, FaUserFriends } from 'react-icons/fa';
import { useAuthContext } from '../context/authContext';

interface SidebarProps {
  showSidebar: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ showSidebar }) => {
  const { user } = useAuthContext();

  return (
    <Wrapper className={showSidebar ? 'show-sidebar' : ''}>
      <div className='content'>
        <NavLink
          to='courses'
          className={({ isActive }) =>
            isActive ? 'activated nav-link' : 'nav-link'
          }
        >
          <FaBookDead className='icon' />
          <span className='text'>All Courses</span>
        </NavLink>
        <NavLink
          to='registered-courses'
          className={({ isActive }) =>
            isActive ? 'activated nav-link' : 'nav-link'
          }
        >
          <FaBookmark className='icon' />
          <span className='text'>Registered</span>
        </NavLink>
        {user?.role === 'admin' && (
          <NavLink
            to='users'
            className={({ isActive }) =>
              isActive ? 'activated nav-link' : 'nav-link'
            }
          >
            <FaUserFriends className='icon' />
            <span className='text'>All Users</span>
          </NavLink>
        )}
      </div>
    </Wrapper>
  );
};

export default Sidebar;
