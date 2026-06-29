"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Team_1 = __importDefault(require("../models/Team"));
const teamsRouter = (0, express_1.Router)();
teamsRouter.get('/', async (_req, res, next) => {
    try {
        const teams = await Team_1.default.find().populate('members').sort({ createdAt: -1 }).lean();
        res.json(teams);
    }
    catch (error) {
        next(error);
    }
});
teamsRouter.post('/', async (req, res, next) => {
    try {
        const { name, description, members } = req.body;
        const team = await Team_1.default.create({ name, description, members: members ?? [] });
        res.status(201).json(team);
    }
    catch (error) {
        next(error);
    }
});
exports.default = teamsRouter;
//# sourceMappingURL=teams.js.map