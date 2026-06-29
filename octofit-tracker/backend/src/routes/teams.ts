import { Router } from 'express';
import TeamModel from '../models/Team';

const teamsRouter = Router();

teamsRouter.get('/', async (_req, res, next) => {
  try {
    const teams = await TeamModel.find().populate('members').sort({ createdAt: -1 }).lean();
    res.json(teams);
  } catch (error) {
    next(error);
  }
});

teamsRouter.post('/', async (req, res, next) => {
  try {
    const { name, description, members } = req.body;
    const team = await TeamModel.create({ name, description, members: members ?? [] });
    res.status(201).json(team);
  } catch (error) {
    next(error);
  }
});

export default teamsRouter;
