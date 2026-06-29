"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.port = exports.mongoUri = exports.baseUrl = void 0;
const port = Number(process.env.PORT) || 8000;
exports.port = port;
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
exports.mongoUri = mongoUri;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
exports.baseUrl = baseUrl;
//# sourceMappingURL=config.js.map