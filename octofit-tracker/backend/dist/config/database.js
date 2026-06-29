"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoUri = exports.disconnectDatabase = exports.connectDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
exports.mongoUri = mongoUri;
const connectDatabase = async () => mongoose_1.default.connect(mongoUri);
exports.connectDatabase = connectDatabase;
const disconnectDatabase = async () => mongoose_1.default.disconnect();
exports.disconnectDatabase = disconnectDatabase;
//# sourceMappingURL=database.js.map