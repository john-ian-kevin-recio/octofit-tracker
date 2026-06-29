"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.port = exports.mongoUri = exports.baseUrl = void 0;
const database_1 = require("./config/database");
Object.defineProperty(exports, "mongoUri", { enumerable: true, get: function () { return database_1.mongoUri; } });
const port = Number(process.env.PORT) || 8000;
exports.port = port;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
exports.baseUrl = baseUrl;
//# sourceMappingURL=config.js.map