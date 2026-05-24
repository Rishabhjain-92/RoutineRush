import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Check, X } from 'lucide-react';
import SideBar from '../components/Sidebar/SideBar';
import { useTheme } from '../context/ThemeContext';
import API from '../api/axios';
import toast from 'react-hot-toast';

export default function RoutinePage() {
  const { isDark, themeClasses } = useTheme();
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '', category: '', frequency: 'Daily', notes: '',
  });
  const [tasks, setTasks] = useState([{ name: '', time: '' }]);

  useEffect(() => { fetchRoutines(); }, []);

  const fetchRoutines = async () => {
    try {
      const { data } = await API.get('/routines');
      setRoutines(data);
    } catch (error) {
      toast.error('Failed to load routines');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', category: '', frequency: 'Daily', notes: '' });
    setTasks([{ name: '', time: '' }]);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) { toast.error('Routine name is required'); return; }

    const filteredTasks = tasks.filter((t) => t.name.trim());
    if (filteredTasks.length === 0) {
      toast.error('At least one task is required');
      return;
    }

    try {
      if (editingId) {
        const { data } = await API.put(`/routines/${editingId}`, { ...formData, tasks: filteredTasks });
        setRoutines((prev) => prev.map((r) => (r._id === editingId ? data : r)));
        toast.success('Routine updated! ✏️');
      } else {
        const { data } = await API.post('/routines', { ...formData, tasks: filteredTasks });
        setRoutines((prev) => [data, ...prev]);
        toast.success('Routine created! 🎉');
      }
      setShowAdd(false);
      resetForm();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save routine');
    }
  };

  const handleEdit = (routine) => {
    setFormData({
      name: routine.name,
      category: routine.category || '',
      frequency: routine.frequency || 'Daily',
      notes: routine.notes || '',
    });
    setTasks(
      routine.tasks && routine.tasks.length > 0
        ? routine.tasks.map((t) => ({ name: t.name, time: t.time || '' }))
        : [{ name: '', time: '' }]
    );
    setEditingId(routine._id);
    setShowAdd(true);
  };

  const handleTaskChange = (index, field, value) => {
    const updated = [...tasks];
    updated[index][field] = value;
    setTasks(updated);
  };

  const handleAddTaskRow = () => {
    setTasks([...tasks, { name: '', time: '' }]);
  };

  const handleRemoveTaskRow = (index) => {
    if (tasks.length === 1) {
      setTasks([{ name: '', time: '' }]);
    } else {
      setTasks(tasks.filter((_, i) => i !== index));
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/routines/${id}`);
      setRoutines((prev) => prev.filter((r) => r._id !== id));
      toast.success('Routine deleted');
    } catch (error) {
      toast.error('Failed to delete routine');
    }
  };

  const toggleTask = async (routineId, taskId) => {
    const routine = routines.find((r) => r._id === routineId);
    const task = routine?.tasks.find((t) => t._id === taskId);
    if (task && task.completed) {
      toast.error('Once marked as completed, a task cannot be unchecked today!');
      return;
    }
    try {
      const { data } = await API.put(`/routines/${routineId}/toggle-task/${taskId}`);
      setRoutines((prev) => prev.map((r) => (r._id === routineId ? data : r)));
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update task');
    }
  };

  const handleToggleComplete = async (routineId) => {
    const routine = routines.find((r) => r._id === routineId);
    const allCompletedBefore = routine?.tasks.length > 0 && routine.tasks.every((t) => t.completed);
    if (allCompletedBefore) {
      toast.error('Once marked as completed, a routine cannot be unchecked today!');
      return;
    }
    try {
      const { data } = await API.put(`/routines/${routineId}/toggle-complete`);
      setRoutines((prev) => prev.map((r) => (r._id === routineId ? data : r)));
      toast.success('Routine completed! 🏆 +50 Bonus Points!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update routine');
    }
  };

  return (
    <div className={`flex h-screen w-full overflow-hidden ${themeClasses.body} transition-all duration-700`}>
      <SideBar />

      <main className="flex-1 px-4 md:px-14 py-8 md:py-14 overflow-y-auto">
        <section className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-2">Your Routines</h2>
            <p className={`text-base md:text-lg ${themeClasses.muted}`}>
              Manage all your habits and workflows here!
            </p>
          </div>
          <button
            className="flex items-center gap-2 px-5 py-2 rounded-xl shadow bg-gradient-to-r from-rose-500 to-orange-500 transition-all text-white font-semibold hover:scale-105 hover:shadow-2xl"
            onClick={() => { resetForm(); setShowAdd(true); }}
          >
            <Plus className="w-5 h-5" /> Add Routine
          </button>
        </section>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : routines.length === 0 ? (
          <div className={`${themeClasses.cardStatic} border rounded-3xl p-12 text-center`}>
            <div className="text-6xl mb-4">📋</div>
            <h4 className="text-xl font-bold mb-2">No routines yet!</h4>
            <p className={`${themeClasses.muted} mb-6`}>Click "Add Routine" to create your first one.</p>
          </div>
        ) : (
          <section className="grid md:grid-cols-2 gap-6">
            {routines.map((routine) => {
              const completed = routine.tasks.filter((t) => t.completed).length;
              const total = routine.tasks.length;
              const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

              return (
                <div
                  key={routine._id}
                  className={`${themeClasses.cardStatic} border rounded-3xl p-6 flex flex-col gap-4 shadow-lg transition-all duration-300 hover:scale-[1.02]`}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-xl font-bold">{routine.name}</h4>
                    <span className="px-3 py-1 rounded-lg bg-gradient-to-br from-blue-400/20 to-indigo-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider">
                      {routine.category || 'General'}
                    </span>
                  </div>

                  <ul className="space-y-2">
                    {routine.tasks.map((task) => (
                      <li key={task._id} className="flex items-center gap-2 w-full">
                        <button
                          onClick={() => toggleTask(routine._id, task._id)}
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                            task.completed
                              ? 'bg-green-500 border-green-500 text-white'
                              : isDark ? 'border-gray-500 hover:border-green-400' : 'border-gray-300 hover:border-green-500'
                          }`}
                        >
                          {task.completed && <Check className="w-3.5 h-3.5" />}
                        </button>
                        <span className={task.completed ? 'line-through text-green-400' : themeClasses.muted}>
                          {task.name}
                        </span>
                        {task.time && (
                          <span className="text-xs bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2 py-0.5 rounded-lg ml-auto font-extrabold flex items-center gap-0.5 flex-shrink-0">
                            🕒 {task.time}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center gap-2">
                    <span className="text-xs">Progress</span>
                    <div className="flex-1 h-2 bg-gray-200/20 rounded-full overflow-hidden">
                      <div className="h-2 rounded-full bg-gradient-to-r from-rose-500 to-orange-500 transition-all duration-500" style={{ width: `${percent}%` }}></div>
                    </div>
                    <span className="text-xs font-bold">{percent}%</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-xs space-x-4">
                      <span className="text-green-400">🔥 Streak: {routine.streak}</span>
                      <span className={themeClasses.muted}>Best: {routine.longestStreak}</span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <button
                        onClick={() => handleToggleComplete(routine._id)}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition hover:scale-105 ${
                          percent === 100
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : 'bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                        {percent === 100 ? 'Reset' : 'Mark Done'}
                      </button>
                      <button onClick={() => handleEdit(routine)} className="rounded-full bg-blue-500/10 p-2 hover:bg-blue-500/20 transition" title="Edit">
                        <Edit2 className="w-4 h-4 text-blue-400" />
                      </button>
                      <button onClick={() => handleDelete(routine._id)} className="rounded-full bg-rose-500/10 p-2 hover:bg-rose-500/20 transition" title="Delete">
                        <Trash2 className="w-4 h-4 text-rose-400" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </section>
        )}

        {/* Add/Edit Modal */}
        {showAdd && (
          <div className="fixed z-50 inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className={`w-full max-w-lg mx-auto border rounded-3xl p-8 shadow-2xl relative ${isDark ? 'bg-slate-900/95 border-blue-500/30' : 'bg-white/95 border-indigo-200/90'}`}>
              <button
                type="button"
                className="absolute top-3 right-4 text-2xl text-slate-400 hover:text-rose-500 transition-all hover:scale-125"
                onClick={() => { setShowAdd(false); resetForm(); }}
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
              <h2 className={`text-2xl font-extrabold text-center mb-6 ${themeClasses.accent}`}>
                {editingId ? 'Edit Routine' : 'Add New Routine'}
              </h2>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <input
                  className={`w-full p-3 rounded-xl border ${themeClasses.input} focus:outline-none focus:ring-2 focus:ring-rose-500/50`}
                  placeholder="Routine Name *"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <div className="flex gap-3">
                  <input className={`flex-1 p-3 rounded-xl border ${themeClasses.input} focus:outline-none`} placeholder="Category (optional, e.g. Fitness)" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
                  <select className={`flex-1 p-3 rounded-xl border ${themeClasses.input} focus:outline-none`} value={formData.frequency} onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}>
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Every 2 Days">Every 2 Days</option>
                    <option value="Every 3 Days">Every 3 Days</option>
                  </select>
                </div>

                {/* Tasks Dynamic Rows Builder */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-extrabold text-slate-400 uppercase tracking-wider">Routine Tasks *</h4>
                    <button
                      type="button"
                      onClick={handleAddTaskRow}
                      className="px-3 py-1 rounded-xl text-xs bg-rose-500/10 text-rose-400 border border-rose-500/20 font-bold hover:bg-rose-500/25 transition"
                    >
                      + Add Task
                    </button>
                  </div>
                  <div className="max-h-[180px] overflow-y-auto pr-1 space-y-2">
                    {tasks.map((task, index) => (
                      <div key={index} className="flex gap-2 items-center animate-fadeIn">
                        <input
                          className={`flex-1 p-2.5 rounded-xl border text-sm ${themeClasses.input} focus:outline-none`}
                          placeholder="Task name (e.g. Wake up) *"
                          value={task.name}
                          onChange={(e) => handleTaskChange(index, 'name', e.target.value)}
                        />
                        <input
                          className={`w-[110px] p-2.5 rounded-xl border text-sm text-center font-bold bg-rose-500/10 border-rose-500/20 text-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-500/40 cursor-pointer hover:bg-rose-500/20 transition`}
                          type="time"
                          value={task.time}
                          onChange={(e) => handleTaskChange(index, 'time', e.target.value)}
                          title="Optional Scheduled Time"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveTaskRow(index)}
                          className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 transition flex items-center justify-center flex-shrink-0"
                          title="Remove Task"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <textarea className={`w-full p-3 rounded-xl border ${themeClasses.input} focus:outline-none`} rows={2} placeholder="Notes / Motivation (optional)" value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} />
                <button type="submit" className="w-full py-3 rounded-xl font-bold text-lg shadow-lg transition-all hover:scale-105 bg-gradient-to-r from-rose-500 to-orange-500 text-white">
                  {editingId ? 'Update Routine' : 'Create Routine'}
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
