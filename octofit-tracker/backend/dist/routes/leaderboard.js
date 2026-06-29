"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Leaderboard_1 = __importDefault(require("../models/Leaderboard"));
const leaderboardRouter = (0, express_1.Router)();
leaderboardRouter.get('/', async (_req, res, next) => {
    try {
        const leaderboard = await Leaderboard_1.default.find()
            .populate('user')
            .sort({ points: -1, rank: 1 })
            .lean();
        res.json(leaderboard);
    }
    catch (error) {
        next(error);
    }
});
leaderboardRouter.post('/', async (req, res, next) => {
    try {
        const { user, points, rank } = req.body;
        const entry = await Leaderboard_1.default.create({ user, points, rank });
        res.status(201).json(entry);
    }
    catch (error) {
        next(error);
    }
});
exports.default = leaderboardRouter;
//# sourceMappingURL=leaderboard.js.map