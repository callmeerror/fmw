import { StatusCodes } from 'http-status-codes';
import UserCourse from '../models/UserCourse.js';
import Course from '../models/Course.js';
import { BadRequestError } from '../errors/index.js';
import { Types } from 'mongoose';
import Lesson from '../models/Lesson.js';

const mapCourse = (course) => {
  return {
    id: course._id,
    title: course.title,
    description: course.description,
    imgUrl: course.imgUrl,
  };
};

const getAllCourses = async (req, res) => {
  let courses = await Course.find();
  courses = courses.map((course) => mapCourse(course));
  res.status(StatusCodes.OK).json({ courses });
};

const getAllRegisterCourses = async (req, res) => {
  const userCourses = await UserCourse.find({ user: req.user.userId });
  const courseIds = userCourses.map((userCourse) => {
    return userCourse.course;
  });
  let courses = await Course.find({ _id: { $in: courseIds } });
  courses = courses.map((course) => mapCourse(course));
  res.status(StatusCodes.OK).json({ courses });
};

const registerCourse = async (req, res) => {
  const { course } = req.query;
  if (!course) throw new BadRequestError('hello there');

  await UserCourse.create({ user: req.user.userId, course });

  res.status(StatusCodes.OK).json({ msg: 'registered successfully' });
};

const unregisterCourse = async (req, res) => {
  const { course } = req.query;
  if (!course) throw new BadRequestError('hello there');

  await UserCourse.deleteOne({ user: req.user.userId, course });

  res.status(StatusCodes.OK).json({ msg: 'unregistered successfully' });
};

const addCourse = async (req, res) => {
  const { title, description, imgUrl } = req.body;

  if (!title || !description || !imgUrl)
    throw new BadRequestError('hello there');

  const course = await Course.create({ title, description, imgUrl });

  res.status(StatusCodes.OK).json({
    course: mapCourse(course),
  });
};

const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { title, description, imgUrl } = req.body;

  if (!title && !description && !imgUrl)
    throw new BadRequestError('hello there');

  const course = await Course.findOneAndUpdate(
    { _id: id },
    { title, description, imgUrl },
    { new: true }
  );

  res.status(StatusCodes.OK).json({
    course: mapCourse(course),
  });
};

const deleteCourse = async (req, res) => {
  const { id } = req.params;

  await Lesson.deleteMany({ course: id });
  await UserCourse.deleteMany({ course: id });
  await Course.deleteOne({ _id: id });

  res.status(StatusCodes.OK).json({
    msg: 'Deleted successfully',
  });
};

const getCourse = async (req, res) => {
  const { id } = req.params;

  const course = await Course.findOne({ _id: id });
  const isUserRegistered = await UserCourse.exists({
    user: req.user.userId,
    course: id,
  });

  res.status(StatusCodes.OK).json({
    course: mapCourse(course),
    isUserRegistered: isUserRegistered !== null,
  });
};

export {
  getAllCourses,
  registerCourse,
  getAllRegisterCourses,
  addCourse,
  getCourse,
  unregisterCourse,
  updateCourse,
  deleteCourse,
};
