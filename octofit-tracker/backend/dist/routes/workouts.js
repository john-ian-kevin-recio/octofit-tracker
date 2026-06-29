"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Workout_1 = __importDefault(require("../models/Workout"));
const workoutsRouter = (0, express_1.Router)();
workoutsRouter.get('/', async (_req, res, next) => {
    try {
        const workouts = await Workout_1.default.find().sort({ createdAt: -1 }).lean();
        res.json(workouts);
    }
    catch (error) {
        next(error);
    }
});
workoutsRouter.post('/', async (req, res, next) => {
    try {
        const { title, focusArea, difficulty, durationMinutes, notes } = req.body;
        const workout = await Workout_1.default.create({
            title,
            focusArea,
            difficulty,
            durationMinutes,
            notes,
        });
        res.status(201).json(workout);
    }
    catch (error) {
        next(error);
    }
});
exports.default = workoutsRouter;
//# sourceMappingURL=workouts.js.map