import express from 'express';
import * as lessonsController from '../controllers/lessonsController.js';
import onlyAdmin from '../middleware/only-admin.js';

const router = express.Router();

router.route('/').get(lessonsController.getAllLessons);
router.route('/').post(onlyAdmin, lessonsController.addLesson);
router.route('/:id').put(onlyAdmin, lessonsController.updateLesson);
router.route('/:id').delete(onlyAdmin, lessonsController.deleteLesson);

export default router;
