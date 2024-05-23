import mongoose, { Schema } from 'mongoose';

const LessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide title'],
    maxlength: 50,
  },
  videoUrl: {
    type: String,
    required: [true, 'Please provide video url'],
    maxlength: 100,
  },
  duration: {
    type: String,
    required: true,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
});

export default mongoose.model('Lesson', LessonSchema);
