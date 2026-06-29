"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
const Activity_1 = __importDefault(require("../models/Activity"));
const Leaderboard_1 = __importDefault(require("../models/Leaderboard"));
const Team_1 = __importDefault(require("../models/Team"));
const User_1 = __importDefault(require("../models/User"));
const Workout_1 = __importDefault(require("../models/Workout"));
// Seed the octofit_db database with test data.
const seed = async () => {
    await (0, database_1.connectDatabase)();
    await Promise.all([
        Activity_1.default.deleteMany({}),
        Leaderboard_1.default.deleteMany({}),
        Team_1.default.deleteMany({}),
        User_1.default.deleteMany({}),
        Workout_1.default.deleteMany({}),
    ]);
    const users = await User_1.default.create([
        {
            email: 'ava@octofit.app',
            displayName: 'Ava Strong',
            passwordHash: 'seed_hash_ava',
        },
        {
            email: 'liam@octofit.app',
            displayName: 'Liam Pace',
            passwordHash: 'seed_hash_liam',
        },
        {
            email: 'noah@octofit.app',
            displayName: 'Noah Lift',
            passwordHash: 'seed_hash_noah',
        },
        {
            email: 'mia@octofit.app',
            displayName: 'Mia Flow',
            passwordHash: 'seed_hash_mia',
        },
    ]);
    const userByEmail = new Map(users.map((u) => [u.email, u]));
    const requiredUserId = (email) => {
        const user = userByEmail.get(email);
        if (!user) {
            throw new Error(`Missing seeded user for ${email}`);
        }
        return user._id;
    };
    await Team_1.default.create([
        {
            name: 'Cardio Crew',
            description: 'Endurance-first team focused on running and cycling goals.',
            members: [requiredUserId('ava@octofit.app'), requiredUserId('liam@octofit.app')],
        },
        {
            name: 'Strength Squad',
            description: 'Functional strength and progressive overload training group.',
            members: [requiredUserId('noah@octofit.app'), requiredUserId('mia@octofit.app')],
        },
    ]);
    await Activity_1.default.create([
        {
            user: requiredUserId('ava@octofit.app'),
            type: 'run',
            durationMinutes: 42,
            caloriesBurned: 390,
        },
        {
            user: requiredUserId('liam@octofit.app'),
            type: 'cycle',
            durationMinutes: 55,
            caloriesBurned: 510,
        },
        {
            user: requiredUserId('noah@octofit.app'),
            type: 'strength',
            durationMinutes: 48,
            caloriesBurned: 420,
        },
        {
            user: requiredUserId('mia@octofit.app'),
            type: 'mobility',
            durationMinutes: 30,
            caloriesBurned: 190,
        },
        {
            user: requiredUserId('ava@octofit.app'),
            type: 'other',
            durationMinutes: 25,
            caloriesBurned: 150,
        },
    ]);
    await Leaderboard_1.default.create([
        { user: requiredUserId('liam@octofit.app'), points: 980, rank: 1 },
        { user: requiredUserId('noah@octofit.app'), points: 900, rank: 2 },
        { user: requiredUserId('ava@octofit.app'), points: 860, rank: 3 },
        { user: requiredUserId('mia@octofit.app'), points: 790, rank: 4 },
    ]);
    await Workout_1.default.create([
        {
            title: '5K Pace Builder',
            focusArea: 'cardio',
            difficulty: 'intermediate',
            durationMinutes: 40,
            notes: 'Warm-up, interval repeats, and cooldown.',
        },
        {
            title: 'Total Body Strength',
            focusArea: 'strength',
            difficulty: 'beginner',
            durationMinutes: 35,
            notes: 'Compound lifts with core finisher.',
        },
        {
            title: 'Mobility Reset',
            focusArea: 'mobility',
            difficulty: 'beginner',
            durationMinutes: 20,
            notes: 'Hip, thoracic, and shoulder mobility flow.',
        },
        {
            title: 'Advanced Power Circuit',
            focusArea: 'conditioning',
            difficulty: 'advanced',
            durationMinutes: 50,
            notes: 'High-intensity rounds with short rests.',
        },
    ]);
    const counts = {
        users: await User_1.default.countDocuments(),
        teams: await Team_1.default.countDocuments(),
        activities: await Activity_1.default.countDocuments(),
        leaderboard: await Leaderboard_1.default.countDocuments(),
        workouts: await Workout_1.default.countDocuments(),
    };
    console.log('octofit_db initialized and populated:', counts);
};
seed()
    .catch((error) => {
    console.error('Database seed failed:', error);
    process.exitCode = 1;
})
    .finally(async () => {
    await (0, database_1.disconnectDatabase)();
});
//# sourceMappingURL=seed.js.map