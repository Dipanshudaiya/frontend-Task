import axios from "axios";

const api = axios.create({
   baseURL: "https://task-managment-backend-api.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
api.interceptors.request.use((config) => {
  // Hardcoded token for testing since we're skipping login UI
  const token = localStorage.getItem("token") ;
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  // Also add ngrok skip warning header to the request directly
  config.headers['ngrok-skip-browser-warning'] = 'true';
  
  return config;
});

// Response Interceptor for debugging 500 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // The server responded with a status code that falls out of the range of 2xx
      console.error("API Error Detailed Log:");
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
      console.error("Headers:", error.response.headers);
      
      // If it's a 500 error, we want to see the specific message from the server if it exists
      if (error.response.status === 500) {
         console.warn("SERVER CRASH DETECTED (500). Please check backend logs or if the resource exists.");
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error("API No Response received:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("API Request Setup Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;