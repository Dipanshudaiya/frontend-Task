import { useState, useEffect } from "react";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import useAuthStore from "../store/useAuthStore";
import { useNavigate, useLocation } from "react-router-dom";

const Auth = () => {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  // Determine initial state from navigation state (e.g., from Landing page)
  const [isLogin, setIsLogin] = useState(
    location.state?.initialTab === "register" ? false : true
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-100/40 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <div className="w-full max-w-md relative z-10 px-6">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-10">
          <div className="bg-blue-600 p-3.5 rounded-2xl shadow-xl shadow-blue-500/20 mb-4 transition-transform hover:scale-105 duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Task Board</h1>
        </div>

        {/* Improved Form Card */}
        <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 p-8 md:p-10 relative overflow-hidden">
          {/* Subtle top gradient bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
          
          <div className="mt-2">
            {isLogin ? <LoginForm /> : <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />}
          </div>
        </div>

        {/* Toggle Auth Mode */}
        <div className="text-center mt-8">
          <p className="text-slate-500 text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-blue-600 hover:text-blue-700 font-bold hover:underline transition-all"
            >
              {isLogin ? "Create Account" : "Login here"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;