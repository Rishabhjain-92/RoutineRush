import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  time: {
    type: String,
    default: '',
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const routineSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Routine name is required'],
      trim: true,
    },
    category: {
      type: String,
      default: 'General',
      trim: true,
    },
    frequency: {
      type: String,
      enum: ['Daily', 'Weekly', 'Monthly', 'Every 2 Days', 'Every 3 Days'],
      default: 'Daily',
    },
    time: {
      type: String,
      default: '08:00',
    },
    tasks: [taskSchema],
    streak: {
      type: Number,
      default: 0,
    },
    longestStreak: {
      type: Number,
      default: 0,
    },
    lastCompletedDate: {
      type: Date,
      default: null,
    },
    notes: {
      type: String,
      default: '',
      maxlength: 500,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Routine = mongoose.model('Routine', routineSchema);
export default Routine;
