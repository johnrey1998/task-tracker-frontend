import React, { useEffect, useState } from "react";
import { useAuth } from "@/auth/AuthContext";
import { taskService } from "@/tasks/taskService";
import type { TaskResponse } from "@/tasks/task";
import { UI_STYLES } from "@/theme";

export const DashboardPage: React.FC = () => {
  const { logout } = useAuth();
  const [tasks, setTasks] = useState<TaskResponse[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      const data = await taskService.getTasks();
      setTasks(data);
    } catch (err: any) {
      setError(err.message || "Failed to load tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      await taskService.createTask({ title, description });
      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (err: any) {
      setError(err.message || "Failed to create task");
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await taskService.deleteTask(id);
      fetchTasks();
    } catch (err: any) {
      setError(err.message || "Failed to delete task");
    }
  };

  const handleStartEdit = (task: TaskResponse) => {
    setEditingId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description || "");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
  };

  const handleUpdateTask = async (e: React.FormEvent, id: number) => {
    e.preventDefault();
    if (!editTitle.trim()) return;
    try {
      await taskService.updateTask(id, {
        title: editTitle,
        description: editDescription,
      });
      setEditingId(null);
      fetchTasks();
    } catch (err: any) {
      setError(err.message || "Failed to update task");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Task Dashboard</h1>
          <button
            onClick={logout}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {error && <div className="mb-4 rounded bg-red-50 p-3 text-sm text-red-500">{error}</div>}

        {/* Create Task Form */}
        <form onSubmit={handleCreateTask} className="mb-8 rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-medium text-gray-900">Add New Task</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              type="text"
              placeholder="Task title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={UI_STYLES.dashboardInput}
            />
            <input
              type="text"
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={UI_STYLES.dashboardInput}
            />
          </div>
          <button
            type="submit"
            className="mt-4 rounded-md bg-indigo-600 px-4 py-2 text-white font-midum hover:bg-indigo-700"
          >
            Create Task
          </button>
        </form>

        {/* Task List */}
        <div className="rounded-lg bg-white shadow">
          <ul className="divide-y divide-gray-200">
            {tasks.length === 0 ? (
              <li className="p-6 text-center text-gray-500">No tasks found. Create one above!</li>
            ) : (
              tasks.map((task) => (
                <li key={task.id} className="p-6">
                  {editingId === task.id ? (
                    /* Edit Form */
                    <form onSubmit={(e) => handleUpdateTask(e, task.id)} className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <input
                          type="text"
                          required
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className={UI_STYLES.dashboardInput}
                        />
                        <input
                          type="text"
                          placeholder="Description (optional)"
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                          className={UI_STYLES.dashboardInput}
                        />
                      </div>
                      <div className="flex space-x-2">
                        <button
                          type="submit"
                          className="rounded-md bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={handleCancelEdit}
                          className="rounded-md bg-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-400"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    /* Normal View */
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
                        {task.description && (
                          <p className="text-sm text-gray-500">{task.description}</p>
                        )}
                      </div>
                      <div className="flex space-x-4">
                        <button
                          onClick={() => handleStartEdit(task)}
                          className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="text-sm text-red-600 hover:text-red-800 font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              ))
            )}
          </ul>
        </div>
      </main>
    </div>
  );
};
