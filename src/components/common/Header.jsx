import { useState } from "react";
import useProjectStore from "../../store/useProjectStore";
import useAuthStore from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import AddTaskModal from "./AddTaskModal";

const Header = ({ onMenuClick }) => {
  const { projects, selectedProject, setSelectedProject } = useProjectStore();
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddUser = () => {
    alert("Invite user functionality would open here!");
  };

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

          <div className="flex items-center space-x-2 w-full md:w-auto">
            <select
              className="bg-white border border-gray-200 text-[13px] md:text-sm font-medium text-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-[180px] p-2 md:p-2.5 shadow-sm truncate"
              value={selectedProject?._id || selectedProject?.id || ""}
              onChange={(e) => {
                const project = projects.find(p => (p._id || p.id) === e.target.value);
                if (project) setSelectedProject(project);
              }}
            >
              <option value="" disabled>Select Project</option>
              {projects.map((p) => (
                <option key={p._id || p.id} value={p._id || p.id}>
                  {p.name}
                </option>
              ))}
            </select>

            <select className="hidden lg:block bg-white border border-gray-200 text-sm font-medium text-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-[140px] p-2.5 shadow-sm truncate">
              <option>My Tasks</option>
              <option>All Tasks</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3 md:space-x-6 flex-1">
          {/* Avatar Stack - Hidden on smallest phones */}
          <div className="hidden sm:flex -space-x-3 hover:-space-x-2 transition-all duration-300">
            {[1, 2, 3].map(i => (
              <img 
                key={i}
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=User${i}&backgroundColor=e2e8f0`}
                alt="User Avatar"
                className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white bg-gray-100 shadow-sm relative z-10"
              />
            ))}
            <button 
              onClick={handleAddUser}
              className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white bg-blue-500 text-white flex items-center justify-center font-bold text-sm md:text-lg hover:bg-blue-600 transition-colors shadow-sm relative z-20"
            >
              +
            </button>
          </div>

          <button className="hidden md:block text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          
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
