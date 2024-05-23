import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide title'],
    maxlength: 50,
  },
  imgUrl: {
    type: String,
    required: [true, 'Please provide imgUrl'],
    maxlength: 100,
  },
  description: {
    type: String,
    required: [true, 'Please provide description'],
    maxlength: 2000,
  },
});

export default mongoose.model('Course', CourseSchema);
