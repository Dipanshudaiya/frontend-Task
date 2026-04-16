import { create } from "zustand";
import * as projectApi from "../api/projectApi";

const useProjectStore = create((set, get) => ({
  projects: [],
  selectedProject: null,
  loading: false,
  error: null,

  fetchProjects: async () => {
    set({ loading: true });
    try {
      const res = await projectApi.getProjects();
      const rawData = res.data;
      const projectList = Array.isArray(rawData) ? rawData : (rawData.projects || rawData.data || []);
      
      set({ 
        projects: projectList,
        loading: false 
      });
    } catch (err) {
      console.error("Store fetchProjects error:", err);
      set({ error: err.message, loading: false });
    }
  },

  createProject: async (data) => {
    try {
      await projectApi.createProject(data);
      await get().fetchProjects();
    } catch (err) {
      console.error("Store createProject error:", err);
      set({ error: err.message });
    }
  },

  updateProject: async (id, data) => {
    const stringId = String(id);
    const originalProjects = get().projects;
    
    // Optimistic Update
    const updatedProjects = originalProjects.map(p => 
      String(p._id || p.id) === stringId ? { ...p, ...data } : p
    );
    set({ projects: updatedProjects });

    try {
      const project = originalProjects.find(p => String(p._id || p.id) === stringId);
      const payload = { 
        name: data.name || project?.name || "Untitled Project",
        description: data.description || project?.description || "",
        ...data 
      };
      await projectApi.updateProject(stringId, payload);
    } catch (err) {
      console.error("Store updateProject error:", err);
      set({ projects: originalProjects, error: err.message });
    }
  },

  deleteProject: async (id) => {
    const stringId = String(id);
    const originalProjects = get().projects;
    const projectToDelete = originalProjects.find(p => String(p._id || p.id) === stringId);
    
    // OPTIMISTIC DELETE: Remove from UI immediately
    const filteredProjects = originalProjects.filter(p => String(p._id || p.id) !== stringId);
    set({ projects: filteredProjects });
    
    // If deleted project was selected, clear it
    const currentSelectedId = get().selectedProject?._id || get().selectedProject?.id;
    if (String(currentSelectedId) === stringId) {
       set({ selectedProject: filteredProjects[0] || null });
    }

    try {
      await projectApi.api.delete(`/projects/${stringId}`, {
         data: { name: projectToDelete?.name || "Untitled" }
      });
      console.log("Project deleted from server");
    } catch (err) {
      console.error("Store deleteProject error:", err);
      // Rollback on error
      set({ projects: originalProjects, error: err.message });
    }
  },

  setSelectedProject: (project) =>
    set({ selectedProject: project }),
}));

export default useProjectStore;