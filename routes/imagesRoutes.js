import express from 'express';
import withImage from '../middleware/with-image.js';
import { StatusCodes } from 'http-status-codes';

const router = express.Router();

router.route('/').post(withImage, (req, res) => {
  res.status(StatusCodes.OK).json({ url: req.file.path });
});

export default router;
