import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import Layout from "./layouts/Layouts";

function App() {
  return (
    <Router>
      <Routes>
        
        {/* Landing Page */}
        <Route path="/" element={<Landing />} />

        {/* Auth Page */}
        <Route path="/auth" element={<Auth />} />

        {/* Protected Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;