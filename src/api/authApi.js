import api from "./axios";

export const loginUser = (data) => api.post("/users/login", data);
export const registerUser = (data) => api.post("/users/register", data);