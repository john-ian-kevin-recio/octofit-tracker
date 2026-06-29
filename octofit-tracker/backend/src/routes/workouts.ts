import { Router } from 'express';
import WorkoutModel from '../models/Workout';

const workoutsRouter = Router();

workoutsRouter.get('/', async (_req, res, next) => {
  try {
    const workouts = await WorkoutModel.find().sort({ createdAt: -1 }).lean();
    res.json(workouts);
  } catch (error) {
    next(error);
  }
});

workoutsRouter.post('/', async (req, res, next) => {
  try {
    const { title, focusArea, difficulty, durationMinutes, notes } = req.body;
    const workout = await WorkoutModel.create({
      title,
      focusArea,
      difficulty,
      durationMinutes,
      notes,
    });
    res.status(201).json(workout);
  } catch (error) {
    next(error);
  }
});

export default workoutsRouter;
