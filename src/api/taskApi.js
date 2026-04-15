import api from "./axios";

export { api }; // Export for advanced usage
export const getTasksByProject = (projectId) =>
  api.get(`/projects/${projectId}/tasks`);

export const createTask = (data) =>
  api.post("/tasks", data);

export const updateTask = (id, data) =>
  api.patch(`/tasks/${id}`, data);

export const deleteTask = (id) =>
  api.delete(`/tasks/${id}`);