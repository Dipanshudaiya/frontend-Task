import { useEffect } from "react";
import useTaskStore from "../store/useTaskStore";
import { getTasksByProject } from "../services/taskService";
import useProjectStore from "../store/useProjectStore";

export const useTasks = () => {
  const setTasks = useTaskStore((state) => state.setTasks);
  const selectedProject = useProjectStore((state) => state.selectedProject);

  const token = localStorage.getItem("token");
 useEffect(() => {
    if (!token || !selectedProject) return;

    const fetchTasks = async () => {
      try {
        const data = await getTasksByProject(
          selectedProject._id || selectedProject.id
        );
        setTasks(data);
      } catch (error) {
        console.error("Task fetch error:", error);
      }
    };

    fetchTasks();
  }, [token, selectedProject, setTasks]);
};