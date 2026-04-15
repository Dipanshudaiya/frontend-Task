import useAuthStore from "../../store/useAuthStore";
import { useState, useRef, useEffect } from "react";
import useProjectStore from "../../store/useProjectStore";

const Sidebar = () => {
  const { userName } = useAuthStore();
  const firstLetter = userName ? userName.charAt(0).toUpperCase() : "U";

  const {
    projects,
    selectedProject,
    fetchProjects,
    createProject,
    deleteProject,
    setSelectedProject,
    loading
  } = useProjectStore();

  const [newProjectName, setNewProjectName] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (isAdding && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isAdding]);

  const handleCreate = async (e) => {
    if (e) e.preventDefault();
    if (!newProjectName.trim()) return;
    try {
      await createProject({
        name: newProjectName.trim(),
        description: "Task management project",
      });
      setNewProjectName("");
      setIsAdding(false);
    } catch (err) {
      console.error("Project create error:", err);
    }
  };

  const handleCancel = (e) => {
    if (e) e.stopPropagation();
    setIsAdding(false);
    setNewProjectName("");
  };

  return (
    <div className="h-full flex flex-col bg-[#1E2640] text-gray-300 font-sans shadow-lg">
      {/* HEADER */}
      <div className="p-6 pb-4">
        <div className="flex items-center space-x-2.5">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-lg shadow-md shadow-blue-900/30">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h1 className="text-lg font-bold text-white tracking-wide">Task Board</h1>
        </div>
      </div>

      {/* USER PROFILE CARD */}
      <div className="mx-4 mb-6 bg-gradient-to-r from-[#2A344D] to-[#303d5c] rounded-xl p-4 border border-[#374160]">
        <div className="flex items-center">
          <div className="relative flex-shrink-0">
            {/* First Letter Circle */}
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-900/30 border-2 border-blue-400/30">
              {firstLetter}
            </div>
            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-[#2A344D]" style={{boxShadow: '0 0 8px rgba(34,197,94,0.6)'}}></div>
          </div>
          <div className="flex flex-col ml-3 min-w-0">
            <span className="text-sm font-semibold text-white truncate">{userName}</span>
            <span className="text-[11px] text-green-400 flex items-center mt-0.5">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5 inline-block"></span>
              Active Now
            </span>
          </div>
        </div>
      </div>

      {/* PROJECT LIST */}
      <div className="flex-1 overflow-y-auto px-4 custom-scrollbar text-white">
        <div className="mb-2 px-2">
          <h2 className="text-[13px] font-medium text-gray-400 mb-3 uppercase tracking-wider">Projects</h2>
        </div>

        <div className="space-y-1 mb-6">
          {loading && projects.length === 0 ? (
            <div className="space-y-2 px-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-10 bg-[#2A344D] rounded-lg animate-pulse"></div>
              ))}
            </div>
          ) : (
            projects.map((project) => {
              const pid = project._id || project.id;
              const isActive = (selectedProject?._id === pid) || (selectedProject?.id === pid);
              return (
                <div key={pid} className="group relative">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all
                      ${isActive
                        ? "bg-blue-600 text-white shadow-md shadow-blue-900/20"
                        : "text-gray-300 hover:bg-[#2A344D] hover:text-white"
                      }`}
                  >
                    <svg className="w-4 h-4 mr-3 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2.236a2 2 0 011.664.89l.812 1.22A2 2 0 0010.5 7H20a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V8c0-1.1.9-2 2-2z" /></svg>
                    <span className="truncate pr-6">{project.name}</span>
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); deleteProject(pid); }}
                    className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 transition-all
                      ${isActive ? "text-white/70 hover:text-white" : "text-gray-500 hover:text-red-400 md:opacity-0 group-hover:opacity-100"}`}
                    title="Delete project"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* ADD PROJECT */}
        <div className="px-2 mt-4 pb-6">
          {isAdding ? (
            <form onSubmit={handleCreate} className="space-y-2">
              <input
                ref={inputRef}
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                placeholder="Project name..."
                className="w-full bg-[#2A344D] border-none rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
              <div className="flex gap-2">
                <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-500 text-white text-xs py-2 rounded-lg">Create</button>
                <button type="button" onClick={handleCancel} className="px-3 bg-[#2A344D] hover:bg-gray-600 text-gray-300 text-xs py-2 rounded-lg">Cancel</button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setIsAdding(true)}
              className="w-full flex items-center px-4 py-2.5 rounded-lg text-sm text-gray-300 hover:text-white bg-[#2A344D] hover:bg-[#34405D] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Project
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
