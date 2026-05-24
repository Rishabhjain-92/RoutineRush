import express from 'express';
import Progress from '../models/Progress.js';
import Routine from '../models/Routine.js';
import User from '../models/User.js';
import protect from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

// @route   GET /api/progress
// @desc    Get progress for the last 7 days
// @access  Private
router.get('/', async (req, res) => {
  try {
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);

    const todayStr = today.toISOString().split('T')[0];
    const sevenDaysAgoStr = sevenDaysAgo.toISOString().split('T')[0];

    const progressEntries = await Progress.find({
      user: req.user._id,
      date: { $gte: sevenDaysAgoStr, $lte: todayStr },
    })
      .populate('routine', 'name')
      .sort({ date: -1 });

    res.json(progressEntries);
  } catch (error) {
    console.error('Get progress error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/progress/stats
// @desc    Get overall stats for the user
// @access  Private
router.get('/stats', async (req, res) => {
  try {
    const routines = await Routine.find({ user: req.user._id });
    const totalRoutines = routines.length;

    // Total completed days (unique dates with >= 50% completion)
    const allProgress = await Progress.find({ user: req.user._id });
    const completedDays = allProgress.filter((p) => p.completionPercent >= 50).length;

    // Current streak across all routines
    const currentStreak = routines.reduce((max, r) => Math.max(max, r.streak), 0);
    const longestStreak = routines.reduce((max, r) => Math.max(max, r.longestStreak), 0);

    // Today's completed tasks
    const todayStr = new Date().toISOString().split('T')[0];
    const todayProgress = await Progress.find({ user: req.user._id, date: todayStr });
    const todayCompleted = todayProgress.reduce((sum, p) => sum + p.completedTasks.length, 0);

    // Weekly data (last 7 days)
    const weeklyData = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const dayEntries = allProgress.filter((p) => p.date === dateStr);

      let percent = 0;
      if (dayEntries.length > 0) {
        const totalPercent = dayEntries.reduce((sum, p) => sum + p.completionPercent, 0);
        percent = Math.round(totalPercent / dayEntries.length);
      }

      weeklyData.push({
        day: dayNames[d.getDay()],
        date: dateStr,
        percent,
      });
    }

    const user = await User.findById(req.user._id);
    const points = user ? (user.points || 0) : 0;

    res.json({
      totalRoutines,
      completedDays,
      currentStreak,
      longestStreak,
      todayCompleted,
      weeklyData,
      points,
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/progress
// @desc    Log progress for a routine on a specific date
// @access  Private
router.post('/', async (req, res) => {
  try {
    const { routineId, completedTasks, date } = req.body;

    const routine = await Routine.findOne({ _id: routineId, user: req.user._id });
    if (!routine) {
      return res.status(404).json({ message: 'Routine not found' });
    }

    const dateStr = date || new Date().toISOString().split('T')[0];
    const totalTasks = routine.tasks.length;
    const completionPercent = totalTasks > 0
      ? Math.round((completedTasks.length / totalTasks) * 100)
      : 0;

    // Upsert — update if exists, create if not
    const progress = await Progress.findOneAndUpdate(
      { user: req.user._id, routine: routineId, date: dateStr },
      {
        completedTasks,
        totalTasks,
        completionPercent,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.json(progress);
  } catch (error) {
    console.error('Log progress error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
