"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Activity_1 = __importDefault(require("../models/Activity"));
const activitiesRouter = (0, express_1.Router)();
activitiesRouter.get('/', async (_req, res, next) => {
    try {
        const activities = await Activity_1.default.find().sort({ loggedAt: -1 }).lean();
        res.json(activities);
    }
    catch (error) {
        next(error);
    }
});
activitiesRouter.post('/', async (req, res, next) => {
    try {
        const { user, type, durationMinutes, caloriesBurned, loggedAt } = req.body;
        const activity = await Activity_1.default.create({
            user,
            type,
            durationMinutes,
            caloriesBurned,
            loggedAt,
        });
        res.status(201).json(activity);
    }
    catch (error) {
        next(error);
    }
});
exports.default = activitiesRouter;
//# sourceMappingURL=activities.js.map