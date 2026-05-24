import { useState, useEffect } from 'react';
import SideBar from '../components/Sidebar/SideBar';
import { Users, Trophy, Sparkles, Search, Plus, UserPlus, UserMinus, Check, X, Flame, Trash2, ShieldAlert } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import toast from 'react-hot-toast';

export default function GroupTrackingPage() {
  const { isDark, themeClasses } = useTheme();
  const { user } = useAuth();
  
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [friendsData, setFriendsData] = useState({ friends: [], receivedRequests: [], sentRequests: [] });
  const [leaderboard, setLeaderboard] = useState([]);
  const [leaderSort, setLeaderSort] = useState('points'); // 'points' or 'streak'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFriendsData();
    fetchLeaderboard();
  }, []);

  const fetchFriendsData = async () => {
    try {
      const { data } = await API.get('/users/friends');
      setFriendsData(data);
    } catch (error) {
      console.error('Failed to load friends:', error);
      toast.error('Failed to load friends list');
    } finally {
      setLoading(false);
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const { data } = await API.get('/users/leaderboard');
      setLeaderboard(data);
    } catch (error) {
      console.error('Failed to load leaderboard:', error);
    }
  };

  const handleSearch = async (val) => {
    setSearch(val);
    if (!val.trim()) {
      setSearchResults([]);
      return;
    }
    try {
      const { data } = await API.get(`/users/search?query=${val}`);
      setSearchResults(data);
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  const handleSendRequest = async (friendId) => {
    try {
      await API.post(`/users/friend-request/${friendId}`);
      toast.success('Friend request sent! ✉️');
      setSearchResults((prev) =>
        prev.map((u) => (u._id === friendId ? { ...u, relationship: 'sent' } : u))
      );
      fetchFriendsData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send request');
    }
  };

  const handleAcceptRequest = async (friendId) => {
    try {
      await API.put(`/users/friend-request/${friendId}/accept`);
      toast.success('Friend request accepted! 🤝');
      setSearchResults((prev) =>
        prev.map((u) => (u._id === friendId ? { ...u, relationship: 'friend' } : u))
      );
      fetchFriendsData();
      fetchLeaderboard();
    } catch (err) {
      toast.error('Failed to accept request');
    }
  };

  const handleDeclineRequest = async (friendId) => {
    try {
      await API.put(`/users/friend-request/${friendId}/decline`);
      toast.success('Friend request declined');
      setSearchResults((prev) =>
        prev.map((u) => (u._id === friendId ? { ...u, relationship: 'none' } : u))
      );
      fetchFriendsData();
    } catch (err) {
      toast.error('Failed to decline request');
    }
  };

  const handleRemoveFriend = async (friendId) => {
    if (!confirm('Are you sure you want to remove this friend?')) return;
    try {
      await API.delete(`/users/friend/${friendId}`);
      toast.success('Friend removed');
      setSearchResults((prev) =>
        prev.map((u) => (u._id === friendId ? { ...u, relationship: 'none' } : u))
      );
      fetchFriendsData();
      fetchLeaderboard();
    } catch (err) {
      toast.error('Failed to remove friend');
    }
  };

  function getInitials(firstName, lastName) {
    const f = firstName?.[0] || '';
    const l = lastName?.[0] || '';
    return `${f}${l}`.toUpperCase();
  }

  const avatarColors = [
    'from-rose-500 to-orange-500',
    'from-blue-500 to-cyan-500',
    'from-green-500 to-emerald-500',
    'from-purple-500 to-pink-500',
    'from-amber-500 to-yellow-500'
  ];

  return (
    <div className={`flex h-screen w-full overflow-hidden ${themeClasses.body} transition-all duration-700`}>
      <SideBar />

      <main className="flex-1 px-4 md:px-12 py-8 md:py-12 overflow-y-auto relative">
        {/* Header */}
        <section className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold flex items-center gap-2">
              <Users className="w-8 h-8 text-rose-500" />
              Group Tracking
            </h2>
            <p className={`text-base md:text-lg ${themeClasses.muted} mt-1`}>
              Friend progress, leaderboard, and motivation—all in one dashboard.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 relative">
            <div className={`flex items-center ${isDark ? 'bg-white/10' : 'bg-slate-100'} rounded-xl px-4 py-2 border ${isDark ? 'border-white/5' : 'border-slate-200'}`}>
              <Search className="w-5 h-5 text-rose-400 mr-2 flex-shrink-0" />
              <input
                className={`bg-transparent focus:outline-none w-full sm:w-60 text-sm ${isDark ? 'text-white placeholder-slate-400' : 'text-slate-800 placeholder-slate-500'}`}
                placeholder="Search users by name or email..."
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
              />
              {search && (
                <button onClick={() => handleSearch('')} className="ml-2 text-slate-400 hover:text-rose-500 transition">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Float Search Results */}
            {search && (
              <div className={`absolute top-full right-0 left-0 sm:left-auto sm:w-[350px] mt-2 border rounded-2xl shadow-2xl p-4 z-50 ${isDark ? 'bg-slate-900/95 border-blue-500/30' : 'bg-white/95 border-indigo-200/90'} backdrop-blur-sm max-h-[300px] overflow-y-auto`}>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Search Results</h4>
                {searchResults.length === 0 ? (
                  <p className="text-sm text-slate-400 text-center py-4">No users found.</p>
                ) : (
                  <div className="space-y-3">
                    {searchResults.map((u, idx) => (
                      <div key={u._id} className="flex items-center justify-between gap-2 p-2 rounded-xl hover:bg-white/5 transition">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${avatarColors[idx % avatarColors.length]} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                            {getInitials(u.firstName, u.lastName)}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-bold truncate leading-tight">{u.firstName} {u.lastName}</p>
                            <p className="text-xs text-slate-400 truncate leading-none mt-0.5">{u.email}</p>
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          {u.relationship === 'friend' && (
                            <span className="text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded-lg border border-green-500/20 font-bold">Friends</span>
                          )}
                          {u.relationship === 'sent' && (
                            <span className="text-xs text-slate-400 bg-slate-500/10 px-2 py-1 rounded-lg border border-slate-500/20 font-bold">Sent</span>
                          )}
                          {u.relationship === 'received' && (
                            <button
                              onClick={() => handleAcceptRequest(u._id)}
                              className="text-xs bg-green-500 text-white px-2.5 py-1 rounded-lg font-bold hover:scale-105 transition"
                            >
                              Accept
                            </button>
                          )}
                          {u.relationship === 'none' && (
                            <button
                              onClick={() => handleSendRequest(u._id)}
                              className="text-xs bg-rose-500 text-white px-2.5 py-1 rounded-lg font-bold hover:scale-105 transition flex items-center gap-0.5"
                            >
                              <UserPlus className="w-3.5 h-3.5" /> Add
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Friends list & requests */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Friend Requests list */}
              {friendsData.receivedRequests.length > 0 && (
                <section className={`${themeClasses.cardStatic} border rounded-3xl p-6 shadow-lg border-yellow-500/20 bg-gradient-to-r from-yellow-500/5 to-transparent`}>
                  <h3 className="text-xl font-bold flex items-center gap-2 mb-4 text-yellow-400">
                    <Sparkles className="w-5 h-5 text-yellow-400" />
                    Incoming Friend Requests ({friendsData.receivedRequests.length})
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {friendsData.receivedRequests.map((reqUser, idx) => (
                      <div key={reqUser._id} className={`${isDark ? 'bg-white/5' : 'bg-white'} border border-white/5 p-4 rounded-2xl flex items-center justify-between shadow-sm`}>
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatarColors[idx % avatarColors.length]} flex items-center justify-center text-white text-sm font-bold`}>
                            {getInitials(reqUser.firstName, reqUser.lastName)}
                          </div>
                          <div>
                            <h4 className="font-bold text-sm">{reqUser.firstName} {reqUser.lastName}</h4>
                            <p className="text-xs text-slate-400">{reqUser.email}</p>
                          </div>
                        </div>
                        <div className="flex gap-1.5">
                          <button
                            onClick={() => handleAcceptRequest(reqUser._id)}
                            className="bg-green-500 text-white p-2 rounded-xl hover:bg-green-600 hover:scale-105 transition"
                            title="Accept Request"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeclineRequest(reqUser._id)}
                            className="bg-rose-500 text-white p-2 rounded-xl hover:bg-rose-600 hover:scale-105 transition"
                            title="Decline Request"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Friends list */}
              <section>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  My Friends ({friendsData.friends.length})
                </h3>

                {friendsData.friends.length === 0 ? (
                  <div className={`${themeClasses.cardStatic} border rounded-3xl p-12 text-center`}>
                    <div className="text-6xl mb-4">👋</div>
                    <h4 className="text-xl font-bold mb-2">No friends added yet!</h4>
                    <p className={`${themeClasses.muted} max-w-sm mx-auto mb-4`}>
                      Search for users in the search bar above to send a request and start habit battles!
                    </p>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {friendsData.friends.map((f, idx) => (
                      <div
                        key={f._id}
                        className={`${themeClasses.cardStatic} border rounded-3xl p-6 shadow-md flex flex-col items-center gap-2 group hover:scale-[1.03] transition-all duration-300 relative`}
                      >
                        {/* Remove button */}
                        <button
                          onClick={() => handleRemoveFriend(f._id)}
                          className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition opacity-0 group-hover:opacity-100"
                          title="Remove Friend"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${avatarColors[idx % avatarColors.length]} flex items-center justify-center text-white text-xl font-bold group-hover:scale-110 transition-transform shadow`}>
                          {getInitials(f.firstName, f.lastName)}
                        </div>

                        <h4 className="text-lg font-bold mt-2 truncate max-w-full text-center">{f.firstName} {f.lastName}</h4>
                        
                        <div className="flex gap-2 text-xs font-semibold mb-2">
                          <span className="text-yellow-400">🏆 {f.points || 0} pts</span>
                          <span className="text-orange-400">🔥 {f.streak || 0}d</span>
                        </div>

                        <div className="w-full mt-2">
                          <div className="flex justify-between text-xs font-medium mb-1">
                            <span className={themeClasses.muted}>Today's Progress</span>
                            <span className="text-rose-500 font-bold">{f.progressPercent}%</span>
                          </div>
                          <div className="h-2 rounded-full bg-gray-200/20 overflow-hidden">
                            <div
                              className="h-2 rounded-full bg-gradient-to-r from-rose-500 to-orange-500 transition-all duration-500"
                              style={{ width: `${f.progressPercent}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </div>

            {/* Leaderboard Column */}
            <div className="lg:col-span-4">
              <section className={`${themeClasses.cardStatic} border rounded-3xl p-6 shadow-lg border-yellow-500/20`}>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <Trophy className="w-6 h-6 text-yellow-400 mr-2 animate-pulse" />
                    <h3 className="text-xl font-bold">Leaderboard</h3>
                  </div>
                  <button
                    onClick={() => setLeaderSort(leaderSort === 'points' ? 'streak' : 'points')}
                    className="px-2.5 py-1 rounded-xl text-2xs flex items-center gap-0.5 border border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10 transition font-extrabold text-xs text-rose-400"
                  >
                    Sort: {leaderSort === 'points' ? 'Points ↓' : 'Streak ↓'}
                  </button>
                </div>

                {leaderboard.length === 0 ? (
                  <p className="text-sm text-slate-400 text-center py-6">No entries yet.</p>
                ) : (
                  <div className="space-y-3">
                    {[...leaderboard]
                      .sort((a, b) =>
                        leaderSort === 'points'
                          ? (b.points || 0) - (a.points || 0)
                          : (b.streak || 0) - (a.streak || 0)
                      )
                      .map((entry, idx) => {
                        const isMe = entry._id === user?._id;
                        return (
                          <div
                            key={entry._id}
                            className={`flex items-center justify-between p-3 rounded-2xl transition border ${
                              isMe
                                ? 'bg-gradient-to-r from-yellow-500/10 via-yellow-500/5 to-transparent border-yellow-500/40 shadow-md shadow-yellow-500/5'
                                : 'bg-transparent border-white/5'
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <span className="font-extrabold text-sm w-5 flex-shrink-0 text-center">
                                {idx === 0 && '🥇'}
                                {idx === 1 && '🥈'}
                                {idx === 2 && '🥉'}
                                {idx > 2 && `${idx + 1}`}
                              </span>
                              
                              <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${avatarColors[idx % avatarColors.length]} flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-inner`}>
                                {getInitials(entry.firstName, entry.lastName)}
                              </div>
                              
                              <div className="min-w-0">
                                <p className={`text-sm font-bold truncate leading-tight ${isMe ? 'text-yellow-400' : ''}`}>
                                  {entry.firstName} {entry.lastName} {isMe && '(You)'}
                                </p>
                                <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5 leading-none">
                                  <span>🏆 {entry.points || 0} pts</span>
                                  <span>•</span>
                                  <span className="text-orange-400 flex items-center gap-0.5">
                                    <Flame className="w-3 h-3 flex-shrink-0 text-orange-400" /> {entry.streak || 0}d
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                )}
              </section>
            </div>

          </div>
        )}
      </main>
    </div>
  );
}
