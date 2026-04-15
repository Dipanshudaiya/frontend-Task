const axios = require('axios');

async function test() {
  try {
    const email = `test${Date.now()}@test.com`;
    console.log("Registering...", email);
    const regRes = await axios.post("https://task-managment-backend-api.onrender.com/api/users/register", {
      name: "Test Name",
      email: email,
      password: "password123"
    });
    console.log("Reg response:", regRes.data);
    
    console.log("Logging in...");
    const loginRes = await axios.post("https://task-managment-backend-api.onrender.com/api/users/login", {
      email: email,
      password: "password123"
    });
    console.log("Login response:", loginRes.data);
    
    const token = loginRes.data.token;
    if (token) {
        const payloadBuffer = Buffer.from(token.split('.')[1], 'base64');
        console.log("Token payload:", payloadBuffer.toString());
    }
  } catch (e) {
    console.error(e.response?.data || e.message);
  }
}
test();
