import express from 'express';
import * as coursesController from '../controllers/coursesController.js';
import onlyAdmin from '../middleware/only-admin.js';

const router = express.Router();

router.route('/').get(coursesController.getAllCourses);
router.route('/').post(onlyAdmin, coursesController.addCourse);
router.route('/registered').get(coursesController.getAllRegisterCourses);
router.route('/register').post(coursesController.registerCourse);
router.route('/register').delete(coursesController.unregisterCourse);
router.route('/:id').get(coursesController.getCourse);
router.route('/:id').put(onlyAdmin, coursesController.updateCourse);
router.route('/:id').delete(onlyAdmin, coursesController.deleteCourse);

export default router;
