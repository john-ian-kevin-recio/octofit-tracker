import { Router } from 'express';
import ActivityModel from '../models/Activity';

const activitiesRouter = Router();

activitiesRouter.get('/', async (_req, res, next) => {
  try {
    const activities = await ActivityModel.find().sort({ loggedAt: -1 }).lean();
    res.json(activities);
  } catch (error) {
    next(error);
  }
});

activitiesRouter.post('/', async (req, res, next) => {
  try {
    const { user, type, durationMinutes, caloriesBurned, loggedAt } = req.body;
    const activity = await ActivityModel.create({
      user,
      type,
      durationMinutes,
      caloriesBurned,
      loggedAt,
    });
    res.status(201).json(activity);
  } catch (error) {
    next(error);
  }
});

export default activitiesRouter;
