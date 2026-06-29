"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = __importDefault(require("../models/User"));
const usersRouter = (0, express_1.Router)();
usersRouter.get('/', async (_req, res, next) => {
    try {
        const users = await User_1.default.find().sort({ createdAt: -1 }).lean();
        res.json(users);
    }
    catch (error) {
        next(error);
    }
});
usersRouter.post('/', async (req, res, next) => {
    try {
        const { email, displayName, passwordHash } = req.body;
        const created = await User_1.default.create({ email, displayName, passwordHash });
        res.status(201).json(created);
    }
    catch (error) {
        next(error);
    }
});
exports.default = usersRouter;
//# sourceMappingURL=users.js.map