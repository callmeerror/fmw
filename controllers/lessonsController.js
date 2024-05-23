import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../errors/index.js';
import Lesson from '../models/Lesson.js';

const mapLesson = (lesson) => {
  return {
    id: lesson._id,
    title: lesson.title,
    duration: lesson.duration,
    videoUrl: lesson.videoUrl,
    post: lesson.post,
  };
};

const getAllLessons = async (req, res) => {
  const { course } = req.query;
  if (!course) throw new BadRequestError('hello there');

  const lessons = await Lesson.find({ course });
  res
    .status(StatusCodes.OK)
    .json({ lessons: lessons.map((lesson) => mapLesson(lesson)) });
};

const addLesson = async (req, res) => {
  const { course, title, duration, videoUrl } = req.body;
  if (!course || !title || !duration || !videoUrl)
    throw new BadRequestError('hello there');

  const lesson = await Lesson.create({ course, title, duration, videoUrl });
  res.status(StatusCodes.OK).json({ lesson: mapLesson(lesson) });
};

const updateLesson = async (req, res) => {
  const { id } = req.params;
  const { title, duration, videoUrl } = req.body;
  if (!title || !duration || !videoUrl)
    throw new BadRequestError('hello there');

  const lesson = await Lesson.findByIdAndUpdate(
    { _id: id },
    { title, duration, videoUrl },
    { new: true }
  );
  res.status(StatusCodes.OK).json({ lesson: mapLesson(lesson) });
};

const deleteLesson = async (req, res) => {
  const { id } = req.params;
  await Lesson.deleteOne({ _id: id });
  res.status(StatusCodes.OK).json({ msg: 'Deleted successfully' });
};

export { getAllLessons, addLesson, updateLesson, deleteLesson };
