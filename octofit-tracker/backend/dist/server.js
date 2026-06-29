"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const config_1 = require("./config");
const activities_1 = __importDefault(require("./routes/activities"));
const leaderboard_1 = __importDefault(require("./routes/leaderboard"));
const teams_1 = __importDefault(require("./routes/teams"));
const users_1 = __importDefault(require("./routes/users"));
const workouts_1 = __importDefault(require("./routes/workouts"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const apiRouter = express_1.default.Router();
apiRouter.get('/health', (_req, res) => {
    res.json({
        status: 'ok',
        service: 'octofit-backend',
        baseUrl: config_1.baseUrl,
        port: config_1.port,
        mongoUri: config_1.mongoUri,
    });
});
apiRouter.use('/users', users_1.default);
apiRouter.use('/teams', teams_1.default);
apiRouter.use('/activities', activities_1.default);
apiRouter.use('/leaderboard', leaderboard_1.default);
apiRouter.use('/workouts', workouts_1.default);
app.use('/api', apiRouter);
app.use((error, _req, res, _next) => {
    const message = error instanceof Error ? error.message : 'Unexpected error';
    res.status(500).json({ error: message });
});
const startServer = async () => {
    try {
        await (0, database_1.connectDatabase)();
        console.log(`Connected to MongoDB at ${config_1.mongoUri}`);
        app.listen(config_1.port, () => {
            console.log(`API listening on ${config_1.baseUrl}`);
        });
    }
    catch (error) {
        console.error('Failed to start backend:', error);
        process.exit(1);
    }
};
void startServer();
//# sourceMappingURL=server.js.map