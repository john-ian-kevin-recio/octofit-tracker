"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const teamSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    members: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });
const TeamModel = (0, mongoose_1.model)('Team', teamSchema);
exports.default = TeamModel;
//# sourceMappingURL=Team.js.map