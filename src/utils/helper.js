export const filterTasksByStatus = (tasks, status) =>
  tasks.filter(t => t.status === status);