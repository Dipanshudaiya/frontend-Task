import Column from "./Column";
import { STATUS } from "../../utils/constants";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  PointerSensor,
  TouchSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { useState, useEffect } from "react";
import useTaskStore from "../../store/useTaskStore";
import useProjectStore from "../../store/useProjectStore";
import TaskCard from "./TaskCard";

const TaskBoard = () => {
  const { tasks, fetchTasks, updateTask, loading } = useTaskStore();
  const { projects, selectedProject } = useProjectStore();
  const [activeTask, setActiveTask] = useState(null);

  // Fetch tasks whenever project changes or on initial load
  useEffect(() => {
    if (selectedProject?._id || selectedProject?.id) {
      fetchTasks(selectedProject._id || selectedProject.id);
    } else if (tasks.length === 0 && projects.length > 0) {
      // Default to first project's tasks on refresh
      fetchTasks(projects[0]._id || projects[0].id);
    }
  }, [selectedProject, fetchTasks, projects]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 6,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event) => {
    const task = tasks.find((t) => (t._id === event.active.id || t.id === event.active.id));
    setActiveTask(task);
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    // Check if dropped over a column or another task
    let newStatus = over.id;
    if (![STATUS.TODO, STATUS.IN_PROGRESS, STATUS.DONE].includes(over.id)) {
      // If dropped over a task, get that task's status
      const overTask = tasks.find(t => (t._id === over.id || t.id === over.id));
      if (overTask) newStatus = overTask.status;
    }

    const activeTaskData = tasks.find((t) => (t._id === active.id || t.id === active.id));
    
    if (activeTaskData && activeTaskData.status !== newStatus) {
      // Update status in backend and handle optimistic update in store
      const pid = selectedProject?._id || selectedProject?.id || projects[0]?._id || projects[0]?.id;
      await updateTask(active.id, { status: newStatus }, pid);
    }
  };

  // Only show "No Project" if we literally have no projects and no selected project
  if (!selectedProject && projects.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-slate-500 animate-in fade-in duration-700">
        <div className="w-24 h-24 mb-6 rounded-full bg-slate-900/50 flex items-center justify-center border border-slate-800">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-white mb-2">No Projects Found</h2>
        <p className="text-sm">Create a new project from the sidebar to start tracking tasks</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-0 animate-in fade-in duration-500 h-full">
      {/* BOARD */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 min-h-0 h-full overflow-y-auto md:overflow-hidden p-1">
          <Column title="To Do" status={STATUS.TODO} loading={loading} />
          <Column title="In Progress" status={STATUS.IN_PROGRESS} loading={loading} />
          <Column title="Done" status={STATUS.DONE} loading={loading} />
        </div>

        <DragOverlay>
          {activeTask ? (
            <div className="opacity-90 rotate-2 scale-105 transition-transform duration-200">
              <TaskCard task={activeTask} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default TaskBoard;



