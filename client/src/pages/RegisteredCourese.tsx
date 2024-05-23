import React, { useEffect, useState } from 'react';
import Wrapper from '../assets/wrappers/RegisteredCourses';
import Course from '../components/Course';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/authContext';
import { AxiosError } from 'axios';
import { message } from 'antd';
import Loading from '../components/Loading';

type ICourse = {
  id: string;
  title: string;
  imgUrl: string;
};

const RegisteredCourses: React.FC = () => {
  const navigate = useNavigate();

  const [status, setStatus] = useState<
    'idle' | 'loading' | 'succeed' | 'failed'
  >('idle');
  const [courses, setCourses] = useState<ICourse[]>([]);
  const { authClient } = useAuthContext();

  useEffect(() => {
    if (status === 'idle') {
      setStatus('loading');
      const getUser = async () => {
        try {
          const response = await authClient.get('/courses/registered');
          const { courses } = response.data;
          setCourses(courses);
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
  }, [status, authClient]);

  if (status === 'loading')
    return (
      <Loading
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'calc(100vh - 120px)',
        }}
      />
    );

  return (
    <Wrapper>
      <h1>Registered Courses</h1>
      <div className='courses-container'>
        {courses.map((courses) => {
          return (
            <Course
              key={courses.id}
              imageUrl={courses.imgUrl}
              title={courses.title}
              onClick={() => navigate(`/courses/${courses.id}`)}
            />
          );
        })}
      </div>
    </Wrapper>
  );
};

export default RegisteredCourses;
