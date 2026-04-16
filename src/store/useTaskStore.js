import { create } from "zustand";
import * as taskApi from "../api/taskApi";

const useTaskStore = create((set, get) => ({
  tasks: [],
  priorityFilter: "all",
  loading: false,
  error: null,

  setPriorityFilter: (filter) => set({ priorityFilter: filter }),

  fetchTasks: async (projectId) => {
    if (!projectId) return;
    set({ loading: true });
    try {
      const res = await taskApi.getTasksByProject(String(projectId));
      const rawData = res.data;
      const taskList = Array.isArray(rawData) ? rawData : (rawData.tasks || rawData.data || []);
      set({ tasks: taskList, loading: false });
    } catch (err) {
      console.error("Store fetchTasks error:", err);
      set({ error: err.message, loading: false });
    }
  },

  createTask: async (data) => {
    try {
      const payload = {
        title: data.title || "New Task",
        description: data.description || "",
        status: data.status || "todo",
        priority: data.priority || "medium",
        projectId: data.projectId || data.project,
        ...data
      };
      
      const res = await taskApi.createTask(payload);
      if (payload.projectId) await get().fetchTasks(payload.projectId);
    } catch (err) {
      console.error("Store createTask error:", err);
      set({ error: err.message });
    }
  },

  updateTask: async (id, data, projectId) => {
    const stringId = String(id);
    const originalTasks = get().tasks;
    
    // OPTIMISTIC UPDATE: Update UI immediately
    const updatedTasks = originalTasks.map(t => 
      String(t._id || t.id) === stringId ? { ...t, ...data } : t
    );
    set({ tasks: updatedTasks });

    try {
      const task = originalTasks.find(t => String(t._id || t.id) === stringId);
      const payload = {
        title: data.title || task?.title || "Untitled",
        description: data.description || task?.description || "",
        status: data.status || task?.status || "todo",
        priority: data.priority || task?.priority || "medium",
        projectId: projectId || task?.project || task?.projectId,
        ...data
      };

      await taskApi.updateTask(stringId, payload);
    } catch (err) {
      console.error("Store updateTask error:", err);
      // Rollback on error
      set({ tasks: originalTasks, error: err.message });
    }
  },

  deleteTask: async (id, projectId) => {
    const stringId = String(id);
    const originalTasks = get().tasks;
    const taskToDelete = originalTasks.find(t => String(t._id || t.id) === stringId);

    // OPTIMISTIC DELETE: Remove from UI immediately
    const filteredTasks = originalTasks.filter(t => String(t._id || t.id) !== stringId);
    set({ tasks: filteredTasks });

    try {
      await taskApi.api.delete(`/tasks/${stringId}`, {
        data: { projectId: projectId || task?.project || task?.projectId }
      });
      console.log("Task deleted from server");
    } catch (err) {
      console.error("Store deleteTask error:", err);
      // Rollback on error
      set({ tasks: originalTasks, error: err.message });
    }
  },

  setTasks: (tasks) => set({ tasks }),
}));

export default useTaskStore;