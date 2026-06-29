import { Router } from 'express';
import LeaderboardModel from '../models/Leaderboard';

const leaderboardRouter = Router();

leaderboardRouter.get('/', async (_req, res, next) => {
  try {
    const leaderboard = await LeaderboardModel.find()
      .populate('user')
      .sort({ points: -1, rank: 1 })
      .lean();
    res.json(leaderboard);
  } catch (error) {
    next(error);
  }
});

leaderboardRouter.post('/', async (req, res, next) => {
  try {
    const { user, points, rank } = req.body;
    const entry = await LeaderboardModel.create({ user, points, rank });
    res.status(201).json(entry);
  } catch (error) {
    next(error);
  }
});

export default leaderboardRouter;
