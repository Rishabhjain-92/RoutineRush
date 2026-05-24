import { useState, useRef } from 'react';
import { User, Key, Edit2, Trash2, Camera } from 'lucide-react';
import SideBar from '../components/Sidebar/SideBar';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const { isDark, themeClasses } = useTheme();
  const { user, updateUser, logout } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    bio: user?.bio || '',
  });

  const fileInputRef = useRef(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingAvatar(true);
    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const { data } = await API.post('/users/upload-avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      updateUser({ ...user, avatar: data.avatar });
      toast.success('Avatar updated! 📸');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to upload avatar');
    } finally {
      setUploadingAvatar(false);
    }
  };

  function handleInput(e) {
    const { name, value } = e.target;
    setProfile((p) => ({ ...p, [name]: value }));
  }

  const handleSave = async () => {
    setSaving(true);
    try {
      const { data } = await API.put('/users/profile', profile);
      updateUser(data);
      toast.success('Profile updated! ✨');
      setEditMode(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const initials = `${user?.firstName?.[0] || ''}${user?.lastName?.[0] || ''}`.toUpperCase();

  return (
    <div className={`flex h-screen w-full overflow-hidden ${themeClasses.body} transition-all duration-700`}>
      <SideBar />
      <main className="flex-1 px-5 md:px-14 py-10 relative overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col items-center mb-10">
            {/* Avatar */}
            <div className="relative group cursor-pointer mb-4" onClick={() => fileInputRef.current?.click()}>
              {user?.avatar ? (
                <img src={user.avatar} alt="Avatar" className="w-28 h-28 rounded-full object-cover shadow-lg border-4 border-rose-500/20" />
              ) : (
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-rose-500 to-orange-500 shadow-lg flex items-center justify-center text-white text-3xl font-bold">
                  {initials || '?'}
                </div>
              )}
              <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-xs font-bold flex flex-col items-center gap-1">
                  <Camera className="w-5 h-5" /> {uploadingAvatar ? '...' : 'Upload'}
                </span>
              </div>
              <input type="file" ref={fileInputRef} onChange={handleAvatarChange} className="hidden" accept="image/*" disabled={uploadingAvatar} />
            </div>

            <h2 className={`font-black text-3xl mb-1 ${themeClasses.accent}`}>
              {editMode ? (
                <div className="flex gap-2">
                  <input className={`font-black bg-transparent border-b-2 w-32 text-2xl outline-none ${isDark ? 'border-blue-400 text-white' : 'border-indigo-300 text-slate-800'}`} name="firstName" value={profile.firstName} onChange={handleInput} autoFocus placeholder="First" />
                  <input className={`font-black bg-transparent border-b-2 w-32 text-2xl outline-none ${isDark ? 'border-blue-400 text-white' : 'border-indigo-300 text-slate-800'}`} name="lastName" value={profile.lastName} onChange={handleInput} placeholder="Last" />
                </div>
              ) : (
                `${user?.firstName || ''} ${user?.lastName || ''}`
              )}
            </h2>

            <p className="text-slate-400">
              {editMode ? (
                <input className="bg-transparent border-b w-full max-w-sm outline-none text-sm" name="email" value={profile.email} onChange={handleInput} />
              ) : (
                user?.email
              )}
            </p>

            <p className={`mt-3 text-base max-w-lg text-center ${isDark ? 'text-slate-200' : 'text-slate-600'}`}>
              {editMode ? (
                <input className="w-full bg-transparent border-b outline-none text-base" name="bio" value={profile.bio} onChange={handleInput} placeholder="Your bio..." />
              ) : (
                user?.bio || 'No bio yet'
              )}
            </p>

            <div className="flex gap-4 mt-4 animate-fadeIn">
              <span className="px-4 py-2 rounded-2xl bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 text-sm font-bold flex items-center gap-1">
                🏆 {user?.points || 0} Points
              </span>
              <span className="px-4 py-2 rounded-2xl bg-orange-500/10 text-orange-400 border border-orange-500/20 text-sm font-bold flex items-center gap-1">
                🔥 {user?.streak || 0} Days Streak
              </span>
            </div>

            <button
              className={`mt-6 px-7 py-2 rounded-xl font-semibold shadow-lg transition-all hover:scale-105 bg-gradient-to-r from-rose-500 to-orange-500 text-white disabled:opacity-50`}
              onClick={editMode ? handleSave : () => setEditMode(true)}
              disabled={saving}
            >
              {saving ? 'Saving...' : editMode ? 'Save Profile' : 'Edit Profile'}
            </button>
            {editMode && (
              <button className="mt-2 text-sm text-slate-400 hover:text-rose-400 transition" onClick={() => { setEditMode(false); setProfile({ firstName: user?.firstName || '', lastName: user?.lastName || '', email: user?.email || '', bio: user?.bio || '' }); }}>
                Cancel
              </button>
            )}
          </div>

          {/* Account Stats */}
          <div className={`${themeClasses.cardStatic} rounded-3xl border shadow-lg mb-10 px-9 py-7`}>
            <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
              <User className="w-5 h-5" /> Account Info
            </h3>
            <ul className="grid grid-cols-2 gap-x-5 gap-y-3 text-sm">
              <li><span className="font-semibold">Member Since:</span> {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'N/A'}</li>
              <li><span className="font-semibold">Email:</span> {user?.email}</li>
              <li><span className="font-semibold">Total Points:</span> <span className="text-yellow-400 font-bold">{user?.points || 0} pts</span></li>
              <li><span className="font-semibold">Current Streak:</span> <span className="text-orange-400 font-bold">{user?.streak || 0} days</span></li>
              <li><span className="font-semibold">Status:</span> <span className="text-green-400 font-semibold">Active</span></li>
            </ul>
          </div>

          {/* Security */}
          <div className={`${themeClasses.cardStatic} rounded-3xl border shadow px-9 py-7 mb-12 flex flex-col gap-4`}>
            <h3 className="font-bold text-xl flex items-center gap-2 mb-2">
              <Key className="w-5 h-5" /> Password & Security
            </h3>
            <button className="underline font-medium text-blue-500 hover:text-blue-700 transition-colors w-fit" onClick={() => toast('Password change coming soon!', { icon: '🔒' })} type="button">
              Change password
            </button>
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-xl shadow hover:bg-red-600 transition-all flex items-center gap-2 w-fit"
              onClick={() => { if (confirm('Are you sure you want to logout?')) { logout(); } }}
              type="button"
            >
              <Trash2 className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
