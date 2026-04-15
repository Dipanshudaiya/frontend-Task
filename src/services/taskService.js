// import { tasks } from "../data/tasks";
 
// export const getTasks = async () => {
//     return new Promise((resolve) =>{
//         setTimeout(() => resolve(tasks), 500);

//     });
// };

import api from "../api/axios";

export const getTasksByProject = (projectId) => {
  return api.get(`/projects/${projectId}/tasks`)
    .then(res => res.data);
};