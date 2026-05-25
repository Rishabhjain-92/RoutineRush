import express from 'express';
import User from '../models/User.js';
import Routine from '../models/Routine.js';
import protect from '../middleware/auth.js';
import upload from '../config/cloudinary.js';

const router = express.Router();

router.use(protect);

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { firstName, lastName, email, bio, avatar, password } = req.body;

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (bio !== undefined) user.bio = bio;
    if (avatar !== undefined) user.avatar = avatar;

    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ message: 'Email already in use' });
      }
      user.email = email;
    }

    if (password) {
      user.password = password; // Will be hashed by pre-save hook
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      bio: updatedUser.bio,
      avatar: updatedUser.avatar,
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/users/search
// @desc    Search other users in the app
// @access  Private
router.get('/search', async (req, res) => {
  try {
    const query = req.query.query || '';
    if (!query) {
      return res.json([]);
    }
    
    // Find up to 10 users matching regex search
    const users = await User.find({
      _id: { $ne: req.user._id },
      $or: [
        { firstName: { $regex: query, $options: 'i' } },
        { lastName: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
      ],
    }).select('-password').limit(10);

    const currentUser = await User.findById(req.user._id);

    const results = users.map((u) => {
      let status = 'none';
      if (currentUser.friends.includes(u._id)) status = 'friend';
      else if (currentUser.sentRequests.includes(u._id)) status = 'sent';
      else if (currentUser.receivedRequests.includes(u._id)) status = 'received';
      
      return {
        _id: u._id,
        firstName: u.firstName,
        lastName: u.lastName,
        email: u.email,
        bio: u.bio,
        avatar: u.avatar,
        points: u.points || 0,
        streak: u.streak || 0,
        relationship: status,
      };
    });

    res.json(results);
  } catch (error) {
    console.error('Search users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/users/friend-request/:friendId
// @desc    Send a friend request to a user
// @access  Private
router.post('/friend-request/:friendId', async (req, res) => {
  try {
    if (req.user._id.toString() === req.params.friendId) {
      return res.status(400).json({ message: 'You cannot send a friend request to yourself' });
    }

    const friend = await User.findById(req.params.friendId);
    if (!friend) {
      return res.status(404).json({ message: 'User not found' });
    }

    const currentUser = await User.findById(req.user._id);

    if (currentUser.friends.includes(friend._id)) {
      return res.status(400).json({ message: 'You are already friends' });
    }
    if (currentUser.sentRequests.includes(friend._id)) {
      return res.status(400).json({ message: 'Friend request already sent' });
    }
    if (currentUser.receivedRequests.includes(friend._id)) {
      return res.status(400).json({ message: 'You have an incoming request from this user. Accept it instead!' });
    }

    currentUser.sentRequests.push(friend._id);
    friend.receivedRequests.push(currentUser._id);

    await Promise.all([currentUser.save(), friend.save()]);

    res.json({ message: 'Friend request sent!' });
  } catch (error) {
    console.error('Send friend request error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/users/friend-request/:friendId/accept
// @desc    Accept friend request
// @access  Private
router.put('/friend-request/:friendId/accept', async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id);
    const friend = await User.findById(req.params.friendId);

    if (!friend) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!currentUser.receivedRequests.includes(friend._id)) {
      return res.status(400).json({ message: 'No pending request from this user' });
    }

    // Add to friends list, remove from request lists
    currentUser.friends.push(friend._id);
    currentUser.receivedRequests = currentUser.receivedRequests.filter(
      (id) => id.toString() !== friend._id.toString()
    );

    friend.friends.push(currentUser._id);
    friend.sentRequests = friend.sentRequests.filter(
      (id) => id.toString() !== currentUser._id.toString()
    );

    await Promise.all([currentUser.save(), friend.save()]);

    res.json({ message: 'Friend request accepted!' });
  } catch (error) {
    console.error('Accept friend request error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/users/friend-request/:friendId/decline
// @desc    Decline friend request
// @access  Private
router.put('/friend-request/:friendId/decline', async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id);
    const friend = await User.findById(req.params.friendId);

    if (!friend) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove from request lists
    currentUser.receivedRequests = currentUser.receivedRequests.filter(
      (id) => id.toString() !== friend._id.toString()
    );
    friend.sentRequests = friend.sentRequests.filter(
      (id) => id.toString() !== currentUser._id.toString()
    );

    await Promise.all([currentUser.save(), friend.save()]);

    res.json({ message: 'Friend request declined' });
  } catch (error) {
    console.error('Decline friend request error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/users/friend/:friendId
// @desc    Remove a friend
// @access  Private
router.delete('/friend/:friendId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id);
    const friend = await User.findById(req.params.friendId);

    if (!friend) {
      return res.status(404).json({ message: 'User not found' });
    }

    currentUser.friends = currentUser.friends.filter(
      (id) => id.toString() !== friend._id.toString()
    );
    friend.friends = friend.friends.filter(
      (id) => id.toString() !== currentUser._id.toString()
    );

    await Promise.all([currentUser.save(), friend.save()]);

    res.json({ message: 'Friend removed successfully' });
  } catch (error) {
    console.error('Remove friend error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/users/friends
// @desc    Get current user's friends list and request lists
// @access  Private
router.get('/friends', async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id)
      .populate('friends', 'firstName lastName email bio avatar points streak')
      .populate('receivedRequests', 'firstName lastName email bio avatar points streak')
      .populate('sentRequests', 'firstName lastName email bio avatar points streak');

    // Calculate dynamic today completion progress for each friend
    const friendsWithProgress = await Promise.all(
      currentUser.friends.map(async (friend) => {
        const routines = await Routine.find({ user: friend._id });
        let totalTasks = 0;
        let completedTasks = 0;

        routines.forEach((r) => {
          totalTasks += r.tasks.length;
          completedTasks += r.tasks.filter((t) => t.completed).length;
        });

        const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

        return {
          _id: friend._id,
          firstName: friend.firstName,
          lastName: friend.lastName,
          email: friend.email,
          bio: friend.bio,
          avatar: friend.avatar,
          points: friend.points || 0,
          streak: friend.streak || 0,
          progressPercent,
        };
      })
    );

    res.json({
      friends: friendsWithProgress,
      receivedRequests: currentUser.receivedRequests,
      sentRequests: currentUser.sentRequests,
    });
  } catch (error) {
    console.error('Get friends error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/users/leaderboard
// @desc    Get user leaderboard (self + friends, sorted by points)
// @access  Private
router.get('/leaderboard', async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id).select('firstName lastName email avatar points streak friends');
    const friends = await User.find({ _id: { $in: currentUser.friends } }).select('firstName lastName email avatar points streak');

    const leaderboard = [currentUser, ...friends].sort((a, b) => (b.points || 0) - (a.points || 0));

    res.json(leaderboard);
  } catch (error) {
    console.error('Get leaderboard error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/users/upload-avatar
// @desc    Upload user avatar to Cloudinary
// @access  Private
router.post('/upload-avatar', upload.single('avatar'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.avatar = req.file.path; // Cloudinary secure URL
    await user.save();

    res.json({ message: 'Avatar updated successfully', avatar: user.avatar });
  } catch (error) {
    console.error('Avatar upload error:', error);
    res.status(500).json({ message: 'Server error during avatar upload' });
  }
});

export default router;
