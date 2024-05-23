import mongoose, { Schema } from 'mongoose';

const UserCourseSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
});

export default mongoose.model('UserCourse', UserCourseSchema);
