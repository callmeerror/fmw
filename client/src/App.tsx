import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import SharedLayout from './pages/SharedLayout';
import AllCourses from './pages/AllCourses';
import CoursePage from './pages/CourePage';
import RegisteredCourses from './pages/RegisteredCourese';
import Authentication from './pages/Authentication';
import ProtectedRoute from './pages/ProtectedRoute';
import { useAuthContext } from './context/authContext';
import { AxiosError } from 'axios';
import { message } from 'antd';
import Loading from './components/Loading';
import AllUsers from './pages/AllUsers';

const App: React.FC = () => {
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'succeed' | 'failed'
  >('idle');
  const { setAuthClient, setUserAndAuthClient } = useAuthContext();

  useEffect(() => {
    if (status === 'idle') {
      const token = localStorage.getItem('token');
      if (token) {
        setStatus('loading');
        const getUser = async () => {
          try {
            const response = await setAuthClient(token).get(
              '/auth/getUserInfo'
            );
            const { user } = response.data;
            setUserAndAuthClient(user, token);
            setStatus('succeed');
          } catch (err) {
            const error = err as AxiosError;
            localStorage.removeItem('token');
            message.error((error.response!.data as any).msg);
            setStatus('failed');
          }
        };
        getUser();
      }
    }
  }, [status, setAuthClient, setUserAndAuthClient]);

  if (status === 'loading')
    return (
      <Loading
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      />
    );

  return (
    <BrowserRouter>
      <ScrollToTop>
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute>
                <SharedLayout />
              </ProtectedRoute>
            }
          >
            <Route path='' element={<Navigate to='courses' replace />} />
            <Route path='registered-courses' element={<RegisteredCourses />} />
            <Route path='courses' element={<AllCourses />} />
            <Route path='courses/:courseId' element={<CoursePage />} />
            <Route path='users' element={<AllUsers />} />
          </Route>
          <Route path='/authentication' element={<Authentication />} />
        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  );
};

export default App;
