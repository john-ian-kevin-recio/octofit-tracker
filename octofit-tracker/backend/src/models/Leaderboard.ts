import { InferSchemaType, Schema, model } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    points: { type: Number, default: 0, min: 0 },
    rank: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true },
);

type LeaderboardEntry = InferSchemaType<typeof leaderboardSchema>;

const LeaderboardModel = model<LeaderboardEntry>('Leaderboard', leaderboardSchema);

export default LeaderboardModel;
