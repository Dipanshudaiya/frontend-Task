import api from "./axios";

// Register
export const registerUser = (data) =>
  api.post("/users/register", data);

// Login
export const loginUser = (data) =>
  api.post("/users/login", data);