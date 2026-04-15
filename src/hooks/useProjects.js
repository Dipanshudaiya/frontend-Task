import { useEffect } from "react";
import { getProjects } from "../services/projectService";
import useProjectStore from "../store/useProjectStore";

const useProjects = () => {
  const { fetchProjects } = useProjectStore();

  const token = localStorage.getItem("token"); // 👈 token check

  useEffect(() => {
    if (!token) return; // ❗ बिना login API call नहीं होगी

    const fetchData = async () => {
      try {
        const data = await getProjects();
        fetchProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchData();
  }, [token, fetchProjects]); // 👈 dependency update

};

export default useProjects;