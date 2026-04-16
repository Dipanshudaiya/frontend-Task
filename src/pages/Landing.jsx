import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const Landing = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-slate-50 text-slate-900 font-sans selection:bg-blue-500/30">
      
      {/* Background Gradients & Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-300/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-300/30 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4"></div>
        <div className="absolute top-1/2 left-1/2 w-[800px] h-[400px] bg-purple-300/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 rotate-12 pointer-events-none"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20 flex flex-col items-center text-center">

        {/* Hero Title */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight max-w-4xl mx-auto drop-shadow-sm text-slate-800">
          Manage your projects with <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 animate-gradient-x">
            ultimate clarity
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="text-lg md:text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
          The collaborative task board designed to keep your team aligned, focused, and shipping faster. 
          Drag, drop, and conquer your daily goals.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button 
            onClick={() => navigate('/auth')}
            className="group relative px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-[0_10px_40px_-10px_rgba(37,99,235,0.6)] hover:shadow-[0_15px_50px_-15px_rgba(37,99,235,0.8)] transition-all duration-300 transform hover:-translate-y-1 overflow-hidden hover:bg-blue-700"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <span className="relative flex items-center gap-2 text-lg">
              View Project
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default Landing;
