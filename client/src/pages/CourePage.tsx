import React, { useEffect, useState } from 'react';
import Wrapper from '../assets/wrappers/CoursePage';
import Table from '../components/Table';
import { useAuthContext } from '../context/authContext';
import { AxiosError } from 'axios';
import { message } from 'antd';
import Loading from '../components/Loading';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from '../components/Modal';
import LessonForm from '../components/LessonForm';
import PrimaryButton from '../components/PrimaryButton';
import ConfirmForm from '../components/ConfirmForm';
import { MediaPlayer, MediaProvider } from '@vidstack/react';
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from '@vidstack/react/player/layouts/default';

import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import CourseForm from '../components/CourseForm';

type ICourse = {
  id: string;
  title: string;
  description: string;
  imgUrl: string;
};

type ILesson = {
  id: string;
  title: string;
  videoUrl: string;
  duration: string;
  course: string;
};

const CoursePage: React.FC = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState<
    'idle' | 'loading' | 'succeed' | 'failed'
  >('idle');
  const [course, setCourse] = useState<ICourse>();
  const [lessons, setLessons] = useState<ILesson[]>([]);
  const { authClient, user } = useAuthContext();

  const [showAddForm, setShowAddForm] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const [curLesson, setCurLesson] = useState<number>();

  const [curShowLesson, setCurShowLesson] = useState<number>();

  const [isUserRegistered, setUserRegistered] = useState(false);
  const [isRegistering, setRegistering] = useState(false);

  const [action, setAction] = useState<{
    action: 'update' | 'delete' | 'add' | 'none';
    initLesson?: ILesson;
  }>({ action: 'none' });
  const [courseAction, setCourseAction] = useState<
    'update' | 'delete' | 'none'
  >('none');

  useEffect(() => {
    if (status === 'idle') {
      setStatus('loading');
      const getUser = async () => {
        try {
          const { course, isUserRegistered } = (
            await authClient.get(`/courses/${courseId}`)
          ).data;
          const { lessons } = (
            await authClient.get(`/lessons?course=${courseId}`)
          ).data;
          setUserRegistered(isUserRegistered);
          setCourse(course);
          setLessons(lessons);
          setStatus('succeed');
        } catch (err) {
          const error = err as AxiosError;
          message.error((error.response!.data as any).msg);
          setStatus('failed');
        }
      };
      getUser();
    }
  }, [status, authClient, courseId]);

  const handleAddBtnClicked = () => {
    setAction({
      action: 'add',
      initLesson: {
        duration: '',
        id: '',
        course: courseId || '',
        title: '',
        videoUrl: '',
      },
    });
    setShowAddForm(true);
  };
  const handleDeleteBtnClicked = () => {
    setAction({ action: 'delete' });
    setShowAddForm(true);
  };
  const handleUpdateBtnClicked = () => {
    setAction({
      action: 'update',
      initLesson: lessons[curLesson! - 1],
    });
    setShowAddForm(true);
  };

  const handleSubmit = async (lesson: ILesson) => {
    setFormLoading(true);
    if (action.action === 'add') {
      try {
        const response = await authClient.post('/lessons', {
          title: lesson.title,
          videoUrl: lesson.videoUrl,
          duration: lesson.duration,
          course: lesson.course,
        });
        const addedLesson = response.data.lesson;
        setLessons([...lessons, addedLesson]);
        setShowAddForm(false);
        message.success('Added successfully');
      } catch (err) {
        const error = err as AxiosError;
        message.error((error.response!.data as any).msg);
      }
    } else if (action.action === 'update') {
      try {
        const response = await authClient.put(`/lessons/${lesson.id}`, {
          title: lesson.title,
          videoUrl: lesson.videoUrl,
          duration: lesson.duration,
        });
        const addedLesson = response.data.lesson;
        lessons[curLesson! - 1].title = addedLesson.title;
        lessons[curLesson! - 1].videoUrl = addedLesson.videoUrl;
        lessons[curLesson! - 1].duration = addedLesson.duration;
        setLessons([...lessons]);
        setShowAddForm(false);
        message.success('Updated successfully');
      } catch (err) {
        const error = err as AxiosError;
        message.error((error.response!.data as any).msg);
      }
    } else if (action.action === 'delete') {
      try {
        await authClient.delete(`/lessons/${lesson.id}`);
        message.success('Deleted successfully');
      } catch (err) {
        const error = err as AxiosError;
        message.error((error.response!.data as any).msg);
      }
    }
    setAction({ action: 'none' });
    setCurLesson(undefined);
    setFormLoading(false);
  };

  const handleRegister = async () => {
    setRegistering(true);
    try {
      await authClient.post(`/courses/register?course=${courseId}`);
      setUserRegistered(true);
      message.success('Registered successfully');
    } catch (err) {
      const error = err as AxiosError;
      message.error((error.response!.data as any).msg);
    }
    setRegistering(false);
  };

  const handleUnregister = async () => {
    setRegistering(true);
    try {
      await authClient.delete(`/courses/register?course=${courseId}`);
      setUserRegistered(false);
      message.success('Unregistered successfully');
    } catch (err) {
      const error = err as AxiosError;
      message.error((error.response!.data as any).msg);
    }
    setRegistering(false);
  };

  const handleCourseSubmit = async (c: ICourse) => {
    setFormLoading(true);

    if (courseAction === 'delete') {
      try {
        await authClient.delete(`/courses/${courseId}`);
        message.success('Deleted successfully');
        navigate('/');
        setCourseAction('none');
      } catch (err) {
        const error = err as AxiosError;
        message.error((error.response!.data as any).msg);
      }
    } else if (courseAction === 'update') {
      try {
        const response = await authClient.put(`/courses/${courseId}`, {
          title: c.title,
          description: c.description,
          imgUrl: c.imgUrl,
        });
        setCourse(response.data.course);
        message.success('Updated successfully');
        setCourseAction('none');
      } catch (err) {
        const error = err as AxiosError;
        message.error((error.response!.data as any).msg);
      }
    }

    setFormLoading(false);
  };

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
      {showAddForm && (
        <Modal onClickOutside={() => {}}>
          {action.action === 'delete' ? (
            <ConfirmForm
              description='Are you sure?'
              disabled={formLoading}
              message='Deleting a lesson'
              onCancel={() => {
                setShowAddForm(false);
                setAction({ action: 'none' });
              }}
              onConfirm={() => handleSubmit(lessons[curLesson! - 1])}
            />
          ) : action.action !== 'none' ? (
            <LessonForm
              lesson={action.initLesson!}
              disabled={formLoading}
              onCancel={() => {
                setShowAddForm(false);
                setAction({ action: 'none' });
              }}
              onSubmit={handleSubmit}
            />
          ) : (
            false
          )}
        </Modal>
      )}

      {curShowLesson !== undefined && (
        <Modal onClickOutside={() => setCurShowLesson(undefined)}>
          <MediaPlayer
            style={{ width: '800px', marginTop: '50px' }}
            src={`youtube/${lessons[curShowLesson - 1].videoUrl}`}
          >
            <MediaProvider />
            <DefaultVideoLayout icons={defaultLayoutIcons} />
          </MediaPlayer>
        </Modal>
      )}

      {isRegistering && (
        <Modal onClickOutside={() => {}}>
          <Loading
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
            }}
          />
        </Modal>
      )}

      <section className='info'>
        <div className='header'>
          <h1>{course?.title}</h1>
          <div className='btn-container'>
            {!isUserRegistered ? (
              <PrimaryButton onClick={handleRegister}>Register</PrimaryButton>
            ) : (
              <PrimaryButton onClick={handleUnregister} className='btn-danger'>
                Unregister
              </PrimaryButton>
            )}
          </div>
        </div>
        <p>{course?.description}</p>
      </section>
      <div className='sep' />
      <div className='header'>
        <p className='what'>List of lessons</p>
        {user?.role === 'admin' && (
          <div className='btn-container'>
            {curLesson && (
              <>
                <PrimaryButton onClick={handleDeleteBtnClicked}>
                  Delete
                </PrimaryButton>
                <PrimaryButton onClick={handleUpdateBtnClicked}>
                  Update
                </PrimaryButton>
              </>
            )}
            <PrimaryButton onClick={handleAddBtnClicked}>Add</PrimaryButton>
          </div>
        )}
      </div>
      <div className='lesson-container'>
        <Table
          data={lessons.map((lesson, index) => {
            return { index: index + 1, ...lesson };
          })}
          fields={[
            {
              title: 'Index',
              key: 'index',
            },
            {
              title: 'Title',
              key: 'title',
            },
            {
              title: 'Duration',
              key: 'duration',
            },
          ]}
          curSelect={curLesson}
          setCurSelect={setCurLesson}
          setCurByDoubleClick={setCurShowLesson}
        />
      </div>
      {user?.role === 'admin' && (
        <div className='btn-container'>
          <PrimaryButton
            onClick={() => setCourseAction('delete')}
            className='btn-danger'
          >
            Delete
          </PrimaryButton>
          <PrimaryButton onClick={() => setCourseAction('update')}>
            Update
          </PrimaryButton>
        </div>
      )}
      {courseAction !== 'none' && (
        <Modal onClickOutside={() => {}}>
          {courseAction === 'delete' ? (
            <ConfirmForm
              description='Are you sure?'
              disabled={formLoading}
              message='Deleting this course?'
              onCancel={() => setCourseAction('none')}
              onConfirm={() => handleCourseSubmit(course!)}
            />
          ) : (
            <CourseForm
              course={course!}
              disabled={formLoading}
              onCancel={() => setCourseAction('none')}
              onSubmit={handleCourseSubmit}
            />
          )}
        </Modal>
      )}
    </Wrapper>
  );
};

export default CoursePage;
