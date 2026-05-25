import express from 'express';
import Routine from '../models/Routine.js';
import User from '../models/User.js';
import Progress from '../models/Progress.js';
import protect from '../middleware/auth.js';

const router = express.Router();

// All routes are protected
router.use(protect);

// @route   GET /api/routines
// @desc    Get all routines for logged-in user
// @access  Private
router.get('/', async (req, res) => {
  try {
    const routines = await Routine.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(routines);
  } catch (error) {
    console.error('Get routines error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/routines/:id
// @desc    Get single routine
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const routine = await Routine.findOne({ _id: req.params.id, user: req.user._id });
    if (!routine) {
      return res.status(404).json({ message: 'Routine not found' });
    }
    res.json(routine);
  } catch (error) {
    console.error('Get routine error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/routines
// @desc    Create a new routine
// @access  Private
router.post('/', async (req, res) => {
  try {
    const { name, category, frequency, time, tasks, notes } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Routine name is required' });
    }

    // Convert task strings or objects to task schemas containing name and optional time
    const taskObjects = (tasks || []).map((t) =>
      typeof t === 'string' ? { name: t, time: '', completed: false } : { name: t.name, time: t.time || '', completed: !!t.completed }
    );

    const routine = await Routine.create({
      user: req.user._id,
      name,
      category: category || 'General',
      frequency: frequency || 'Daily',
      time: time || '08:00',
      tasks: taskObjects,
      notes: notes || '',
    });

    res.status(201).json(routine);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    console.error('Create routine error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/routines/:id
// @desc    Update a routine
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    const routine = await Routine.findOne({ _id: req.params.id, user: req.user._id });

    if (!routine) {
      return res.status(404).json({ message: 'Routine not found' });
    }

    const { name, category, frequency, time, tasks, notes, isActive } = req.body;

    if (name !== undefined) routine.name = name;
    if (category !== undefined) routine.category = category;
    if (frequency !== undefined) routine.frequency = frequency;
    if (time !== undefined) routine.time = time;
    if (notes !== undefined) routine.notes = notes;
    if (isActive !== undefined) routine.isActive = isActive;
    if (tasks !== undefined) {
      routine.tasks = tasks.map((t) =>
        typeof t === 'string' ? { name: t, time: '', completed: false } : { name: t.name, time: t.time || '', completed: !!t.completed }
      );
    }

    const updated = await routine.save();
    res.json(updated);
  } catch (error) {
    console.error('Update routine error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/routines/:id/toggle-task/:taskId
// @desc    Toggle a task's completion status
// @access  Private
router.put('/:id/toggle-task/:taskId', async (req, res) => {
  try {
    const routine = await Routine.findOne({ _id: req.params.id, user: req.user._id });

    if (!routine) {
      return res.status(404).json({ message: 'Routine not found' });
    }

    const task = routine.tasks.id(req.params.taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.completed) {
      return res.status(400).json({ message: 'Once marked as completed, a task cannot be unchecked!' });
    }

    const previouslyAllCompleted = routine.tasks.every((t) => t.completed);

    task.completed = true;

    // Check if all tasks are completed now
    const allCompleted = routine.tasks.every((t) => t.completed);
    
    // Streaks logic
    if (allCompleted) {
      const today = new Date().toISOString().split('T')[0];
      const lastDate = routine.lastCompletedDate
        ? new Date(routine.lastCompletedDate).toISOString().split('T')[0]
        : null;

      if (lastDate !== today) {
        // Check if it's consecutive
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        if (lastDate === yesterdayStr) {
          routine.streak += 1;
        } else {
          routine.streak = 1;
        }

        if (routine.streak > routine.longestStreak) {
          routine.longestStreak = routine.streak;
        }

        routine.lastCompletedDate = new Date();
      }
    }

    const updated = await routine.save();

    // Gamification Points calculation
    let pointsDiff = 0;
    if (task.completed) {
      pointsDiff += 10; // +10 points for completing a task
      if (allCompleted) {
        pointsDiff += 50; // extra +50 points bonus for completing the entire routine
      }
    } else {
      pointsDiff -= 10; // -10 points for uncompleting a task
      if (previouslyAllCompleted) {
        pointsDiff -= 50; // remove the +50 points bonus
      }
    }

    try {
      const user = await User.findById(req.user._id);
      if (user) {
        user.points = Math.max(0, (user.points || 0) + pointsDiff);
        // Synchronize overall user streak as the maximum of their active routine streaks
        const allRoutines = await Routine.find({ user: req.user._id });
        user.streak = allRoutines.reduce((max, r) => Math.max(max, r.streak), 0);
        await user.save();
      }
    } catch (userSaveError) {
      console.error('Failed to update user points or streak:', userSaveError);
    }

    // Log Progress entry dynamically
    try {
      const todayStr = new Date().toISOString().split('T')[0];
      const completedTasksNames = routine.tasks.filter((t) => t.completed).map((t) => t.name);
      const totalTasksCount = routine.tasks.length;
      const completionPercent = totalTasksCount > 0 ? Math.round((completedTasksNames.length / totalTasksCount) * 100) : 0;

      await Progress.findOneAndUpdate(
        { user: req.user._id, routine: routine._id, date: todayStr },
        {
          completedTasks: completedTasksNames,
          totalTasks: totalTasksCount,
          completionPercent,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    } catch (progressError) {
      console.error('Failed to auto-log progress:', progressError);
    }

    res.json(updated);
  } catch (error) {
    console.error('Toggle task error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

// @route   PUT /api/routines/:id/toggle-complete
// @desc    Toggle all tasks inside a routine as complete/incomplete
// @access  Private
router.put('/:id/toggle-complete', async (req, res) => {
  try {
    const routine = await Routine.findOne({ _id: req.params.id, user: req.user._id });

    if (!routine) {
      return res.status(404).json({ message: 'Routine not found' });
    }

    if (!routine.tasks || routine.tasks.length === 0) {
      return res.status(400).json({ message: 'Routine has no tasks to complete' });
    }

    const allCompletedBefore = routine.tasks.every((t) => t.completed);

    if (allCompletedBefore) {
      return res.status(400).json({ message: 'Once marked as completed, a routine cannot be unchecked today!' });
    }

    const targetStatus = true;

    // Clone tasks to analyze previous states
    const previouslyCompletedCount = routine.tasks.filter((t) => t.completed).length;

    // Set all tasks to target status
    routine.tasks.forEach((task) => {
      task.completed = targetStatus;
    });

    let pointsDiff = 0;
    if (targetStatus) {
      // Completed all tasks!
      const newlyCompletedCount = routine.tasks.length - previouslyCompletedCount;
      pointsDiff += (newlyCompletedCount * 10) + 50; // +10 per task + 50 routine bonus

      // Streaks logic
      const today = new Date().toISOString().split('T')[0];
      const lastDate = routine.lastCompletedDate
        ? new Date(routine.lastCompletedDate).toISOString().split('T')[0]
        : null;

      if (lastDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        if (lastDate === yesterdayStr) {
          routine.streak += 1;
        } else {
          routine.streak = 1;
        }

        if (routine.streak > routine.longestStreak) {
          routine.longestStreak = routine.streak;
        }

        routine.lastCompletedDate = new Date();
      }
    } else {
      // Uncompleted all tasks!
      pointsDiff -= (previouslyCompletedCount * 10);
      if (allCompletedBefore) {
        pointsDiff -= 50; // remove routine completion bonus
      }
    }

    const updated = await routine.save();

    try {
      const user = await User.findById(req.user._id);
      if (user) {
        user.points = Math.max(0, (user.points || 0) + pointsDiff);
        const allRoutines = await Routine.find({ user: req.user._id });
        user.streak = allRoutines.reduce((max, r) => Math.max(max, r.streak), 0);
        await user.save();
      }
    } catch (userSaveError) {
      console.error('Failed to update user points or streak in toggle-complete:', userSaveError);
    }

    // Log Progress entry dynamically
    try {
      const todayStr = new Date().toISOString().split('T')[0];
      const completedTasksNames = routine.tasks.filter((t) => t.completed).map((t) => t.name);
      const totalTasksCount = routine.tasks.length;
      const completionPercent = totalTasksCount > 0 ? Math.round((completedTasksNames.length / totalTasksCount) * 100) : 0;

      await Progress.findOneAndUpdate(
        { user: req.user._id, routine: routine._id, date: todayStr },
        {
          completedTasks: completedTasksNames,
          totalTasks: totalTasksCount,
          completionPercent,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    } catch (progressError) {
      console.error('Failed to auto-log progress:', progressError);
    }

    res.json(updated);
  } catch (error) {
    console.error('Toggle complete routine error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

// @route   DELETE /api/routines/:id
// @desc    Delete a routine
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const routine = await Routine.findOneAndDelete({ _id: req.params.id, user: req.user._id });

    if (!routine) {
      return res.status(404).json({ message: 'Routine not found' });
    }

    const todayStr = new Date().toISOString().split('T')[0];
    const todayProgress = await Progress.findOne({ routine: req.params.id, date: todayStr });
    
    let pointsToDeduct = 0;
    if (todayProgress) {
      pointsToDeduct += todayProgress.completedTasks.length * 10;
      if (todayProgress.completionPercent === 100) {
        pointsToDeduct += 50;
      }
    }

    await Progress.deleteMany({ routine: req.params.id });

    try {
      const user = await User.findById(req.user._id);
      if (user) {
        user.points = Math.max(0, (user.points || 0) - pointsToDeduct);
        const allRoutines = await Routine.find({ user: req.user._id });
        user.streak = allRoutines.reduce((max, r) => Math.max(max, r.streak), 0);
        await user.save();
      }
    } catch (userSaveError) {
      console.error('Failed to update user points or streak on delete:', userSaveError);
    }

    res.json({ message: 'Routine deleted successfully' });
  } catch (error) {
    console.error('Delete routine error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
