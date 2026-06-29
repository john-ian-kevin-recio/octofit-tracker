import { Router } from 'express';
import UserModel from '../models/User';

const usersRouter = Router();

usersRouter.get('/', async (_req, res, next) => {
  try {
    const users = await UserModel.find().sort({ createdAt: -1 }).lean();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

usersRouter.post('/', async (req, res, next) => {
  try {
    const { email, displayName, passwordHash } = req.body;
    const created = await UserModel.create({ email, displayName, passwordHash });
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
});

export default usersRouter;
