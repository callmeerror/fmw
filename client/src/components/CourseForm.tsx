import React, { useState } from 'react';
import Wrapper from '../assets/wrappers/CourseForm';
import { Input } from 'antd';
import { FaCheckDouble } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import ImageUpload from './ImageUpload';
import PrimaryButton from './PrimaryButton';

type ICourse = {
  id: string;
  title: string;
  imgUrl: string;
  description: string;
};

const TextArea = Input.TextArea;

interface CourseProps {
  course: ICourse;
  onSubmit: (course: ICourse) => void;
  onCancel: () => void;
  disabled: boolean;
}

const CourseForm: React.FC<CourseProps> = ({
  course,
  onSubmit,
  onCancel,
  disabled,
}) => {
  const [dumpCourse, setDumpCourse] = useState<ICourse>(course);
  return (
    <Wrapper>
      <div className='form-container'>
        <p className='for-what'>
          {dumpCourse.id ? 'Edit course' : 'Add course'}
        </p>
        <div className='form-row'>
          <label htmlFor='title'>Title</label>
          <Input
            type='text'
            id='title'
            className='input'
            value={dumpCourse.title}
            onChange={(e) => {
              setDumpCourse({ ...dumpCourse, title: e.target.value });
            }}
          />
        </div>
        <div className='form-row'>
          <label htmlFor='description'>Description</label>
          <TextArea
            id='description'
            className='input'
            value={dumpCourse.description}
            onChange={(e) => {
              setDumpCourse({ ...dumpCourse, description: e.target.value });
            }}
          />
        </div>
        <div className='form-row'>
          <label htmlFor='imgUrl'>Image</label>
          <ImageUpload
            id='imgUrl'
            imageUrl={dumpCourse.imgUrl}
            setImageUrl={(imgUrl) => {
              setDumpCourse({ ...dumpCourse, imgUrl });
            }}
          />
        </div>
        <div className='btn-container'>
          <PrimaryButton
            startIcon={FaCheckDouble}
            onClick={(e) => {
              e.preventDefault();
              onSubmit(dumpCourse);
            }}
            disabled={disabled}
          >
            {dumpCourse.id ? 'Update' : 'Create'}
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

export default CourseForm;
