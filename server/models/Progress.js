import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    routine: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Routine',
      required: true,
    },
    date: {
      type: String, // Store as YYYY-MM-DD for easy querying
      required: true,
    },
    completedTasks: [String], // task names completed on this date
    totalTasks: {
      type: Number,
      required: true,
    },
    completionPercent: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index: one progress entry per routine per day
progressSchema.index({ user: 1, routine: 1, date: 1 }, { unique: true });

const Progress = mongoose.model('Progress', progressSchema);
export default Progress;
