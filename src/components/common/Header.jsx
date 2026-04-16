import { useState } from "react";
import useProjectStore from "../../store/useProjectStore";
import useTaskStore from "../../store/useTaskStore";
import useAuthStore from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import AddTaskModal from "./AddTaskModal";

const Header = ({ onMenuClick }) => {
  const { projects, selectedProject, setSelectedProject } = useProjectStore();
  const { priorityFilter, setPriorityFilter } = useTaskStore();
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Local state for the filter dropdown to decouple it from Sidebar selection
  const [displayFilterId, setDisplayFilterId] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <header className="flex items-center justify-between px-4 md:px-8 py-4 md:py-5 bg-white border-b border-gray-100 shadow-sm z-10 relative">
        <div className="flex items-center space-x-2 md:space-x-4 flex-1">
          {/* MOBILE MENU TOGGLE */}
          <button 
            onClick={onMenuClick}
            className="p-2 -ml-2 text-gray-400 hover:text-gray-600 md:hidden transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="flex flex-row items-center gap-2 w-full md:w-auto">
            {/* Project Select */}
            <select
              className="bg-white border border-gray-200 text-[12px] md:text-sm font-medium text-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 md:w-[180px] p-2 md:p-2.5 shadow-sm truncate cursor-pointer"
              value={displayFilterId}
              onChange={(e) => {
                const val = e.target.value;
                setDisplayFilterId(val); // Only update header text on manual click
                
                if (val === "") {
                  setSelectedProject(null);
                } else {
                  const project = projects.find(p => (p._id || p.id) === val);
                  if (project) setSelectedProject(project);
                }
              }}
            >
              <option value="">Select Project</option>
              {projects.map((p) => (
                <option key={p._id || p.id} value={p._id || p.id}>
                  {p.name}
                </option>
              ))}
            </select>

            {/* Priority Filter */}
            <select
              className="bg-slate-50 border border-slate-200 text-[12px] md:text-sm font-semibold text-slate-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 md:w-[140px] p-2 md:p-2.5 shadow-sm"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="all">All Priorities</option>
              <option value="high">🔴 High</option>
              <option value="medium">🟡 Medium</option>
              <option value="low">🟢 Low</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3 md:space-x-4 flex-1">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#2563EB] hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-2 md:py-2.5 px-3 md:px-5 rounded-lg flex items-center shadow-md shadow-blue-500/20 transition-all text-[12px] md:text-sm whitespace-nowrap"
          >
            <span className="hidden xs:inline">Add Task</span>
            <span className="xs:hidden">Add</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 md:ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
          </button>

          {/* LOGOUT BUTTON */}
          <button 
            onClick={handleLogout}
            className="flex items-center bg-red-50 hover:bg-red-100 text-red-600 font-medium py-2 md:py-2.5 px-3 md:px-4 rounded-lg transition-all text-[12px] md:text-sm whitespace-nowrap border border-red-200"
          >
            Logout
            <span className="ml-2 w-2 h-2 rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.7)]"></span>
          </button>
        </div>
      </header>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        status="todo" 
      />
    </>
  );
};

export default Header;
