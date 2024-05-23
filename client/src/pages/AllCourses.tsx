import React, { useEffect, useState } from 'react';
import Wrapper from '../assets/wrappers/AllCourses';
import Course from '../components/Course';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/authContext';
import { AxiosError } from 'axios';
import { message } from 'antd';
import Loading from '../components/Loading';
import Modal from '../components/Modal';
import CourseForm from '../components/CourseForm';
import PrimaryButton from '../components/PrimaryButton';

type ICourse = {
  id: string;
  title: string;
  imgUrl: string;
  description: string;
};

const AllCourses: React.FC = () => {
  const navigate = useNavigate();

  const [status, setStatus] = useState<
    'idle' | 'loading' | 'succeed' | 'failed'
  >('idle');
  const [courses, setCourses] = useState<ICourse[]>([]);
  const { authClient, user } = useAuthContext();

  const [showAddForm, setShowAddForm] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      setStatus('loading');
      const getUser = async () => {
        try {
          const response = await authClient.get('/courses');
          const { courses } = response.data;
          setCourses(courses);
          setStatus('succeed');
        } catch (err) {
          const error = err as AxiosError;
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

  const handleAddBtnClicked = () => {
    setShowAddForm(true);
  };

  const handleSubmitAddCourse = async (course: ICourse) => {
    setFormLoading(true);
    try {
      const response = await authClient.post('/courses', {
        title: course.title,
        imgUrl: course.imgUrl,
        description: course.description,
      });
      const addedCourse = response.data.course;
      setCourses([addedCourse, ...courses]);
      setShowAddForm(false);
      message.success('Added successfully');
    } catch (err) {
      const error = err as AxiosError;
      message.error((error.response!.data as any).msg);
    }
    setFormLoading(false);
  };

  return (
    <Wrapper>
      {showAddForm && (
        <Modal onClickOutside={() => {}}>
          <CourseForm
            course={{ id: '', imgUrl: '', title: '', description: '' }}
            disabled={formLoading}
            onCancel={() => setShowAddForm(false)}
            onSubmit={handleSubmitAddCourse}
          />
        </Modal>
      )}
      <div className='header'>
        <h1>All Courses</h1>
        {user?.role === 'admin' && (
          <div className='btn-container'>
            <PrimaryButton onClick={handleAddBtnClicked}>Add</PrimaryButton>
          </div>
        )}
      </div>
      <div className='courses-container'>
        {courses.map((course) => {
          return (
            <Course
              key={course.id}
              imageUrl={course.imgUrl}
              title={course.title}
              onClick={() => navigate(`/courses/${course.id}`)}
            />
          );
        })}
      </div>
    </Wrapper>
  );
};

export default AllCourses;
