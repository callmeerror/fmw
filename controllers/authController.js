import User from '../models/User.js';
import { BadRequestError, UnauthenticatedError } from '../errors/index.js';
import { StatusCodes } from 'http-status-codes';

const register = async (req, res) => {
  const { email, name, password } = req.body;
  if (!email && !name && !password) {
    throw new BadRequestError('何も記入しないですが。。。');
  }
  const user = await User.create({ email, name, password });
  const token = user.createJWT();

  res.status(StatusCodes.OK).json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError('すべとの情報を入力してください');
  }
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new UnauthenticatedError('アカウントは存在しない');
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('パスワードは間違っている');
  }
  const token = user.createJWT();

  res.status(StatusCodes.OK).json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  });
};

const updateUser = async (req, res) => {
  const { email, name } = req.body;
  if (!email || !name) {
    throw new BadRequestError('ここにあるよ');
  }

  const user = await User.findOne({ _id: req.user.userId });

  user.email = email;
  user.name = name;

  await user.save();
  const token = user.createJWT();

  res.status(StatusCodes.OK).json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  });
};

const getUserInfo = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  res.status(StatusCodes.OK).json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

const getAllUsers = async (req, res) => {
  const users = await User.find();

  res.status(StatusCodes.OK).json({
    users: users.map((user) => {
      return {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
    }),
  });
};

export { getUserInfo, register, login, updateUser, getAllUsers };
