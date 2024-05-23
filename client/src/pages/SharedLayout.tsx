import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Logo from '../components/Logo';
import { FaBars, FaCaretLeft } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Wrapper from '../assets/wrappers/SharedLayout';

const SharedLayout: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <Wrapper>
      <main className='dashboard'>
        <div className='toggle-sidebar'>
          <div className={showSidebar ? 'toggle-btn hide' : 'toggle-btn'} onClick={() => setShowSidebar(true)}>
            <FaBars />
          </div>
          <Logo />
          <div className={showSidebar ? 'toggle-btn' : 'toggle-btn hide'} onClick={() => setShowSidebar(false)}>
            <FaCaretLeft />
          </div>
        </div>
        <Sidebar showSidebar={showSidebar}/>
        <div className='dashboard-main'>
          <Navbar />
          <div className='dashboard-page'>
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
};

export default SharedLayout;
