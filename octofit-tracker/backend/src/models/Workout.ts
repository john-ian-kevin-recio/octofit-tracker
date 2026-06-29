import { InferSchemaType, Schema, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    focusArea: { type: String, required: true, trim: true },
    difficulty: {
      type: String,
      required: true,
      enum: ['beginner', 'intermediate', 'advanced'],
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    notes: { type: String, default: '' },
  },
  { timestamps: true },
);

type Workout = InferSchemaType<typeof workoutSchema>;

const WorkoutModel = model<Workout>('Workout', workoutSchema);

export default WorkoutModel;
