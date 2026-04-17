import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import useTaskStore from "../../store/useTaskStore";
import useProjectStore from "../../store/useProjectStore";

const TaskCard = ({ task }) => {
  const { deleteTask, updateTask } = useTaskStore();
  const { selectedProject } = useProjectStore();
  
  const taskId = task._id || task.id;
  const currentProjectId = selectedProject?._id || selectedProject?.id;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: taskId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : 1,
  };

  const priorityColors = {
    high: "bg-[#EF4444] text-white",
    medium: "bg-[#F97316] text-white",
    low: "bg-[#22C55E] text-white",
    default: "bg-gray-500 text-white"
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    const newTitle = prompt("Edit Task Title", task.title);
    if (newTitle) updateTask(taskId, { title: newTitle }, currentProjectId);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (confirm("Delete this task?")) deleteTask(taskId, currentProjectId);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative bg-white p-4 rounded-lg border border-gray-200 transition-all duration-200
        ${isDragging 
          ? "shadow-xl border-blue-400 rotate-2 scale-105" 
          : "hover:shadow-md hover:border-gray-300 shadow-sm"
        }`}
    >
      <div className="flex justify-between items-start mb-2">
        <div {...attributes} {...listeners} className="flex-1 cursor-grab active:cursor-grabbing outline-none" style={{ touchAction: 'none' }}>
          <h3 className="font-bold text-gray-900 text-sm leading-tight group-hover:text-blue-600 transition-colors">
            {task.title}
          </h3>
          {task.description && (
            <p className="mt-1.5 text-[12px] text-gray-500 leading-relaxed font-medium line-clamp-2">
              {task.description}
            </p>
          )}
        </div>
        
        <div className="flex space-x-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-200">
          <button 
            onClick={handleEdit} 
            className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600 transition-colors"
            title="Edit task"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
          <button 
            onClick={handleDelete} 
            className="p-1 hover:bg-red-50 rounded text-gray-400 hover:text-red-500 transition-colors"
            title="Delete task"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50">
        <div className="flex items-center">
          {task.priority && (
            <span className={`text-[9px] uppercase font-black px-2 py-0.5 rounded-md ${priorityColors[task.priority] || priorityColors.default} tracking-wider`}>
              {task.priority}
            </span>
          )}
        </div>

        {task.dueDate && (
          <div className="flex items-center text-[10px] font-bold text-gray-400">
            <svg className="w-3 h-3 mr-1.5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            <span>{new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
          </div>
        )}

        {task.status === "done" && (
          <div className="flex items-center justify-center w-5 h-5 rounded-full bg-green-50 text-green-500">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;


