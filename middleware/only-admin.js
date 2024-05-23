import jwt from 'jsonwebtoken';
import UnauthenticatedError from '../errors/unauthenicated.js';

const onlyAdmin = async (req, res, next) => {
  if (req.user.userRole === 'admin') {
    next();
  } else {
    throw new UnauthenticatedError(
      'To live a better life, I need my love to be here'
    );
  }
};

export default onlyAdmin;
