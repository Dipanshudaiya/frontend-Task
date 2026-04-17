import { useState, useEffect, useRef } from "react";
import useTaskStore from "../../store/useTaskStore";
import useProjectStore from "../../store/useProjectStore";

const AddTaskModal = ({ isOpen, onClose, status }) => {
  const { createTask } = useTaskStore();
  const { projects, selectedProject } = useProjectStore();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);
  const firstInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => firstInputRef.current?.focus(), 100);
      setLoading(false);
      setDueDate(""); // Clear date when opening
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!title.trim() || loading) return;

    setLoading(true);
    try {
      // Fallback to first project if no project is selected in the store
      const activeProject = selectedProject || projects[0];
      const pid = activeProject?._id || activeProject?.id;

      if (!pid) {
        console.error("No project ID found for task creation");
        setLoading(false);
        return;
      }

      createTask({
        title: title.trim(),
        description: description.trim(),
        status: status || "todo",
        priority,
        dueDate,
        projectId: pid,
        project: pid, 
      });

      setTitle("");
      setDescription("");
      setPriority("medium");
      setDueDate("");
      onClose();
    } catch (err) {
      console.error("Task create error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex justify-center items-center p-4 bg-[#1E2640]/40 backdrop-blur-md transition-all duration-300"
      onKeyDown={(e) => e.key === 'Escape' && onClose()}
      onClick={onClose}
    >
      {/* Modal Content */}
      <div 
        className="w-full max-w-[520px] bg-white rounded-[32px] shadow-[0_25px_50px_-12px_rgba(30,38,64,0.3)] overflow-hidden animate-in zoom-in-95 duration-300 border border-gray-100 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="overflow-y-auto custom-scrollbar">
        {/* STYLISH HEADER */}
        <div className="px-6 py-8 md:px-8 md:py-10 bg-gradient-to-br from-[#2563EB] via-[#3B82F6] to-[#60A5FA] relative overflow-hidden shrink-0">
          {/* Decorative circles */}
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-indigo-400/20 rounded-full blur-xl"></div>
          
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex flex-col">
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight drop-shadow-sm">Add Task</h2>
              <div className="flex items-center mt-2 space-x-2">
                 {projects.length > 0 ? (
                   <>
                     <span className="bg-white/20 text-white text-[10px] font-black py-1 px-3 rounded-full uppercase tracking-widest backdrop-blur-md border border-white/20 truncate max-w-[120px]">
                       {(selectedProject || projects[0])?.name}
                     </span>
                     <span className="bg-white text-blue-600 text-[10px] font-black py-1 px-3 rounded-full uppercase tracking-widest shadow-sm">
                       {status}
                     </span>
                   </>
                 ) : (
                   <span className="bg-red-500/20 text-white text-[10px] font-black py-1 px-3 rounded-full uppercase tracking-widest backdrop-blur-md border border-red-500/20">
                     No Project Found
                   </span>
                 )}
              </div>
            </div>
            <button 
              onClick={onClose} 
              className="text-white/80 hover:text-white transition-all p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 active:scale-90 backdrop-blur-sm border border-white/10"
            >
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
               </svg>
            </button>
          </div>
        </div>

        {projects.length === 0 && (
          <div className="mx-8 mt-6 p-4 bg-orange-50 border border-orange-200 rounded-2xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="p-2 bg-orange-100 rounded-lg shrink-0">
              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
            <div>
              <p className="text-[13px] font-bold text-orange-800">No project available!</p>
              <p className="text-[11px] text-orange-600/80 font-semibold leading-relaxed">
                You cannot add a task without creating a project first. Please create a project from the sidebar to continue.
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6 md:space-y-8 bg-white">
          <div className="space-y-6">
            <div className="group">
              <label className="flex items-center text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-2 transition-colors group-focus-within:text-blue-500">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                Task Title
              </label>
              <input
                ref={firstInputRef}
                className="w-full bg-[#F8FAFC] border-2 border-transparent focus:border-blue-500 focus:bg-white focus:ring-[6px] focus:ring-blue-500/10 p-4 md:p-5 rounded-2xl text-base md:text-lg font-bold text-gray-800 transition-all outline-none placeholder:text-gray-300 shadow-inner"
                placeholder="What's the goal?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="group">
              <label className="flex items-center text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-2 transition-colors group-focus-within:text-blue-500">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h7" /></svg>
                Description
              </label>
              <textarea
                className="w-full bg-[#F8FAFC] border-2 border-transparent focus:border-blue-500 focus:bg-white focus:ring-[6px] focus:ring-blue-500/10 p-4 md:p-5 rounded-2xl text-sm font-semibold text-gray-500 transition-all outline-none min-h-[120px] md:min-h-[140px] resize-none placeholder:text-gray-300 leading-relaxed shadow-inner"
                placeholder="Break down the details here..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="group">
                <label className="flex items-center text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-2 transition-colors group-focus-within:text-orange-500">
                  <svg className="w-4 h-4 mr-2 text-orange-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/><circle cx="12" cy="12" r="5" fill="currentColor"/></svg>
                  Priority
                </label>
                <div className="relative">
                  <select
                    className="w-full bg-[#F8FAFC] border-2 border-transparent focus:border-blue-500 focus:bg-white p-4 md:p-5 rounded-2xl text-[13px] font-black text-gray-800 transition-all outline-none cursor-pointer appearance-none uppercase tracking-widest shadow-inner"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    disabled={loading}
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>

              <div className="group">
                <label className="flex items-center text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-2 transition-colors group-focus-within:text-blue-500">
                  <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  Due Date
                </label>
                <input
                  type="date"
                  className="w-full bg-[#F8FAFC] border-2 border-transparent focus:border-blue-500 focus:bg-white p-4 md:p-5 rounded-2xl text-[13px] font-black text-gray-800 transition-all outline-none uppercase tracking-widest cursor-pointer shadow-inner"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button 
              type="button"
              onClick={onClose} 
              disabled={loading}
              className="px-8 py-5 bg-gray-50 hover:bg-gray-100 text-gray-400 text-[11px] font-black rounded-2xl transition-all uppercase tracking-[0.25em] active:scale-95 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || projects.length === 0}
              className={`flex-1 py-5 rounded-2xl text-white text-[11px] font-black transition-all shadow-[0_15px_30px_-5px_rgba(37,99,235,0.4)] uppercase tracking-[0.25em] flex items-center justify-center space-x-3 active:scale-[0.98]
                ${(loading || projects.length === 0) ? "bg-gray-300 cursor-not-allowed shadow-none" : "bg-[#2563EB] hover:bg-blue-500"}
              `}
            >
              {loading && (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              <span>{loading ? "Adding..." : (projects.length === 0 ? "Project Required" : "Add New Task")}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);
};

export default AddTaskModal;