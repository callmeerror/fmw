import React, { useState } from 'react';
import Wrapper from '../assets/wrappers/LessonForm';
import { Input } from 'antd';
import { FaCheckDouble } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import PrimaryButton from './PrimaryButton';

type ILesson = {
  id: string;
  title: string;
  videoUrl: string;
  duration: string;
  course: string;
};

interface LessonProps {
  lesson: ILesson;
  onSubmit: (lesson: ILesson) => void;
  onCancel: () => void;
  disabled: boolean;
}

const LessonForm: React.FC<LessonProps> = ({
  lesson,
  onSubmit,
  onCancel,
  disabled,
}) => {
  const [dumpLesson, setDumpLesson] = useState<ILesson>(lesson);
  return (
    <Wrapper>
      <div className='form-container'>
        <p className='for-what'>
          {dumpLesson.id ? 'Edit lesson' : 'Add lesson'}
        </p>
        <div className='form-row'>
          <label htmlFor='title'>Title</label>
          <Input
            type='text'
            id='title'
            className='input'
            value={dumpLesson.title}
            onChange={(e) => {
              setDumpLesson({ ...dumpLesson, title: e.target.value });
            }}
          />
        </div>
        <div className='form-row'>
          <label htmlFor='videoUrl'>Video URL</label>
          <Input
            type='text'
            id='videoUrl'
            className='input'
            value={dumpLesson.videoUrl}
            onChange={(e) => {
              setDumpLesson({ ...dumpLesson, videoUrl: e.target.value });
            }}
          />
        </div>
        <div className='form-row'>
          <label htmlFor='duration'>Duration</label>
          <Input
            type='text'
            id='duration'
            className='input'
            value={dumpLesson.duration}
            onChange={(e) => {
              setDumpLesson({ ...dumpLesson, duration: e.target.value });
            }}
          />
        </div>
        <div className='btn-container'>
          <PrimaryButton
            startIcon={FaCheckDouble}
            onClick={(e) => {
              e.preventDefault();
              onSubmit(dumpLesson);
            }}
            disabled={disabled}
          >
            {dumpLesson.id ? 'Update' : 'Create'}
          </PrimaryButton>
          <PrimaryButton
            startIcon={FaTimes}
            className='btn-cancel'
            onClick={() => onCancel()}
            disabled={disabled}
            type='button'
          >
            Cancel
          </PrimaryButton>
        </div>
      </div>
    </Wrapper>
  );
};

export default LessonForm;
