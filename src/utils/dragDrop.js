export const handleDragEnd = (event, moveTask) => {
  const { active, over } = event;

  if (!over) return;

  moveTask(active.id, over.id);
};