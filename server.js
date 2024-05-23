import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const app = express();
app.use(express.json());

// logger
import morgan from 'morgan';

// allow throw error to middleware
import 'express-async-errors';

// db
import connectDB from './db/connect.js';

// middleware
import notFoundMiddleWare from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import authenticateUser from './middleware/auth.js';

// router
import authRouter from './routes/authRoutes.js';
import coursesRouter from './routes/coursesRoutes.js';
import lessonsRouter from './routes/lessonsRoutes.js';
import imagesRouter from './routes/imagesRoutes.js';

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/courses', authenticateUser, coursesRouter);
app.use('/api/v1/lessons', authenticateUser, lessonsRouter);
app.use('/api/v1/images', authenticateUser, imagesRouter);

app.use(notFoundMiddleWare);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    const port = process.env.PORT || 5000;
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log('忘れてやらない！');
    });
  } catch (error) {
    console.log('ばかやろう！');
    console.log(error);
  }
};

start();
