import { useState } from "react";
import useTaskStore from "../../store/useTaskStore";
import useProjectStore from "../../store/useProjectStore";
import TaskCard from "./TaskCard";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import AddTaskModal from "../common/AddTaskModal";

const COLUMN_STYLES = {
  todo: {
    label: "To Do",
    color: "bg-[#1E74F2]",
    textColor: "text-white",
  },
  "in-progress": {
    label: "In Progress",
    color: "bg-[#EAB308]",
    textColor: "text-white",
  },
  done: {
    label: "Done",
    color: "bg-[#22C55E]",
    textColor: "text-white",
  },
};

const Column = ({ title, status, loading }) => {
  const { tasks } = useTaskStore();
  const { selectedProject } = useProjectStore();
  const [open, setOpen] = useState(false);

  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  const style = COLUMN_STYLES[status] || COLUMN_STYLES.todo;

  const filteredTasks = tasks.filter((task) => {
    const matchStatus = task.status === status;
    const currentProjectId = selectedProject?._id || selectedProject?.id;
    const taskProjectId = task.project || task.projectId;
    
    const matchProject = selectedProject 
      ? (String(taskProjectId) === String(currentProjectId))
      : true;
    return matchStatus && matchProject;
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col h-full min-h-[500px] rounded-xl overflow-hidden bg-white border border-gray-200 transition-all duration-300
        ${isOver ? "ring-2 ring-blue-400 bg-blue-50/50" : "shadow-sm"}
      `}
    >
      {/* HEADER */}
      <div className={`p-4 flex items-center justify-between ${style.color} ${style.textColor}`}>
        <h2 className="text-lg font-bold tracking-wide">{title}</h2>
        <div className="flex items-center space-x-2">
          <span className="bg-white/20 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            {loading ? "..." : filteredTasks.length}
          </span>
          <button className="text-white hover:bg-white/20 p-1 rounded transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* TASK LIST */}
      <div className="flex-1 p-3 overflow-y-auto space-y-3 custom-scrollbar bg-[#F8FAFC]">
        <SortableContext
          items={filteredTasks.map((task) => task._id || task.id)}
          strategy={verticalListSortingStrategy}
        >
          {filteredTasks.map((task) => (
            <TaskCard key={task._id || task.id} task={task} />
          ))}
        </SortableContext>

        {loading && filteredTasks.length === 0 && (
          <div className="space-y-3">
            {[1, 2].map(i => (
               <div key={i} className="h-28 bg-gray-200 rounded-lg animate-pulse w-full"></div>
            ))}
          </div>
        )}

        {/* BOTTOM ADD TASK BUTTON */}
        <button
          onClick={() => setOpen(true)}
          className="w-full flex items-center justify-center space-x-2 py-2 mt-2 rounded-lg text-sm text-gray-500 hover:text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          <span>+ Add Task</span>
        </button>
      </div>

      <AddTaskModal
        isOpen={open}
        onClose={() => setOpen(false)}
        status={status}
      />
    </div>
  );
};

export default Column;


