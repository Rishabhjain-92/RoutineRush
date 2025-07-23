import { useState } from "react";
import { User, Key, Edit2, Trash2, Sun, Moon } from "lucide-react";
import SideBar from "../components/Sidebar/SideBar";

export default function ProfilePage() {
  const [isDark, setIsDark] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    avatar: "/default-avatar.png", // Update to your default avatar path
    name: "Rishabh Jain",
    email: "rishabhjain92148@gmail.com",
    bio: "RoutineRush enthusiast | Chasing habits, beating streaks.",
  });

  const themeBg = isDark
    ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white"
    : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-slate-800";

  const card = isDark
    ? "bg-white/5 border-white/20"
    : "bg-white/90 border-indigo-200/70";

  function handleInput(e) {
    const { name, value } = e.target;
    setProfile((p) => ({ ...p, [name]: value }));
  }

  return (
    <div className={`flex h-screen w-full ${themeBg} transition-all duration-700`}>
      <SideBar isDark={isDark} setIsDark={setIsDark} />
      <main className="flex-1 px-5 md:px-14 py-10 relative overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col items-center mb-10 animate-pop">
            <div className="relative w-32 h-32 rounded-full border-4 border-blue-500 shadow-lg overflow-hidden mb-4">
              <img
                src={profile.avatar}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
              {/* Avatar Upload */}
              <label
                className="absolute bottom-2 right-2 bg-blue-500 text-white rounded-full p-1.5 shadow hover:scale-110 transition-transform cursor-pointer"
                title="Upload avatar"
              >
                <Edit2 className="w-4 h-4" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = () =>
                        setProfile((p) => ({ ...p, avatar: reader.result }));
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
            </div>

            <h2
              className={`font-black text-3xl mb-1 ${
                isDark ? "text-blue-400" : "text-indigo-600"
              }`}
            >
              {editMode ? (
                <input
                  className={`font-black bg-transparent border-b-2 w-full max-w-xs text-2xl outline-none ${
                    isDark ? "border-blue-400 text-white" : "border-indigo-300 text-slate-800"
                  }`}
                  name="name"
                  value={profile.name}
                  onChange={handleInput}
                  autoFocus
                />
              ) : (
                profile.name
              )}
            </h2>

            <p className="text-slate-400">
              {editMode ? (
                <input
                  className="bg-transparent border-b w-full max-w-sm outline-none text-sm"
                  name="email"
                  value={profile.email}
                  onChange={handleInput}
                />
              ) : (
                profile.email
              )}
            </p>

            <p
              className={`mt-3 text-base max-w-lg text-center ${
                isDark ? "text-slate-200" : "text-slate-600"
              }`}
            >
              {editMode ? (
                <input
                  className="w-full bg-transparent border-b outline-none text-base"
                  name="bio"
                  value={profile.bio}
                  onChange={handleInput}
                />
              ) : (
                profile.bio
              )}
            </p>

            <button
              className={`mt-6 px-7 py-2 rounded-xl font-semibold shadow-lg transition-all hover:scale-105 ${
                isDark
                  ? "bg-gradient-to-r from-blue-500 to-cyan-400 text-white"
                  : "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
              }`}
              onClick={() => setEditMode((e) => !e)}
            >
              {editMode ? "Save Profile" : "Edit Profile"}
            </button>
          </div>

          <div
            className={`${card} rounded-3xl border shadow-lg mb-10 px-9 py-7 animate-fadeInUp`}
          >
            <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
              <User /> Account Stats
            </h3>
            <ul className="grid grid-cols-2 gap-x-5 gap-y-2 text-sm">
              <li>
                <span className="font-semibold">Member Since:</span> Feb 2023
              </li>
              <li>
                <span className="font-semibold">Daily Streak:</span> 7 Days
              </li>
              <li>
                <span className="font-semibold">Longest Streak:</span> 14 Days
              </li>
              <li>
                <span className="font-semibold">Routines Completed:</span> 112
              </li>
              <li>
                <span className="font-semibold">Groups Joined:</span> 3
              </li>
              <li>
                <span className="font-semibold">Progress Level:</span> Pro
              </li>
            </ul>
          </div>

          <div
            className={`${card} rounded-3xl border shadow px-9 py-7 mb-12 animate-pop flex flex-col gap-4`}
          >
            <h3 className="font-bold text-xl flex items-center gap-2 mb-2">
              <Key /> Password & Security
            </h3>
            <button
              className="underline font-medium text-blue-600 hover:text-blue-800 transition-colors w-fit"
              onClick={() => alert("Coming soon!")}
              type="button"
            >
              Change password
            </button>
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600 transition-all flex items-center gap-2 w-fit"
              onClick={() => alert("Account deletion coming soon!")}
              type="button"
            >
              <Trash2 className="w-4 h-4" /> Delete Account
            </button>
          </div>
        </div>

        {/* Animations */}
        <style>{`
          @keyframes popIn {
            0% {
              transform: scale(0.92);
              opacity: 0;
            }
            100% {
              transform: none;
              opacity: 1;
            }
          }
          @keyframes fadeInUp {
            0% {
              opacity: 0;
              transform: translateY(40px);
            }
            100% {
              opacity: 1;
              transform: none;
            }
          }
          .animate-pop {
            animation: popIn 0.8s cubic-bezier(0.43, 0.97, 0.54, 1.19) both;
          }
          .animate-fadeInUp {
            animation: fadeInUp 0.88s cubic-bezier(0.41, 0.85, 0.34, 1.19) both;
          }
        `}</style>
      </main>
    </div>
  );
}
