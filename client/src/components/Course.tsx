import React from 'react';
import Wrapper from '../assets/wrappers/Course';

interface CourseProps {
  imageUrl: string;
  title: string;
  onClick: () => void;
}

const Course: React.FC<CourseProps> = ({ imageUrl, title, onClick }) => {
  return (
    <Wrapper onClick={onClick}>
      <div>
        <img alt='background' src={imageUrl} />
      </div>
      <p>{title}</p>
    </Wrapper>
  );
};

export default Course;
