import express from 'express';
import * as authController from '../controllers/authController.js';
import authenticateUser from '../middleware/auth.js';
import onlyAdmin from '../middleware/only-admin.js';

const router = express.Router();

router.route('/register').post(authController.register);
router.route('/login').post(authController.login);
router.route('/updateUser').patch(authenticateUser, authController.updateUser);
router.route('/getUserInfo').get(authenticateUser, authController.getUserInfo);
router.route('/getAllUsers').get(authenticateUser, onlyAdmin, authController.getAllUsers);

export default router;