import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  CheckSquare, 
  MousePointer2, 
  Users, 
  Clock, 
  BarChart3, 
  ArrowRight,
  Menu,
  X
} from "lucide-react";
import useAuthStore from "../store/useAuthStore";
import { useState } from "react";

const Landing = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleViewProject = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      // Open register form for demo view
      navigate("/auth", { state: { initialTab: "register" } });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => navigate('/')}>
            <div className="bg-blue-600 p-2 rounded-lg shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
              <CheckSquare className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-800">Task Board</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-4">
            <a 
              href="#features" 
              className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all duration-300"
            >
              Features
            </a>
            <button 
              onClick={() => navigate('/auth', { state: { initialTab: 'register' } })}
              className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all duration-300"
            >
              Register
            </button>
            <button 
              onClick={() => navigate('/auth', { state: { initialTab: 'login' } })}
              className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all duration-300"
            >
              Login
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2 text-slate-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-100 p-6 flex flex-col gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
            <a 
              href="#features" 
              onClick={() => setIsMenuOpen(false)} 
              className="w-full py-4 px-6 bg-white border border-slate-200 rounded-2xl text-center font-bold text-slate-700 active:bg-blue-600 active:text-white active:border-blue-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300"
            >
              Features
            </a>
            <button 
              onClick={() => { setIsMenuOpen(false); navigate('/auth', { state: { initialTab: 'register' } }); }} 
              className="w-full py-4 px-6 bg-white border border-slate-200 rounded-2xl text-center font-bold text-slate-700 active:bg-blue-600 active:text-white active:border-blue-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300"
            >
              Register
            </button>
            <button 
              onClick={() => { setIsMenuOpen(false); navigate('/auth', { state: { initialTab: 'login' } }); }} 
              className="w-full py-4 px-6 bg-white border border-slate-200 rounded-2xl text-center font-bold text-slate-700 active:bg-blue-600 active:text-white active:border-blue-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300"
            >
              Login
            </button>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Abstract Background Decoration */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-50 to-transparent z-0 pointer-events-none"></div>
        <div className="absolute top-20 right-[10%] w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-3xl z-0 animate-pulse"></div>

        <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] mb-8 text-slate-900 tracking-tight">
              Manage your projects with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">ultimate clarity</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              The collaborative task board designed to keep your team aligned, focused, and shipping faster. 
              Drag, drop, and conquer your daily goals.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button 
                onClick={() => navigate('/auth', { state: { initialTab: 'register' } })}
                className="w-full sm:w-auto px-10 py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] hover:shadow-[0_25px_50px_-12px_rgba(37,99,235,0.6)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                Get Started Free
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={handleViewProject}
                className="w-full sm:w-auto px-10 py-4 bg-white text-slate-700 font-bold rounded-2xl border border-slate-200 shadow-sm hover:bg-slate-50 transition-all flex items-center justify-center"
              >
                View Demo
              </button>
            </div>
          </div>

          {/* Hero Image Container */}
          <div className="flex-1 relative">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] border-8 border-white/50 bg-white">
              <img 
                src="/mockup.png" 
                alt="Dashboard Mockup" 
                className="w-full object-contain"
              />
            </div>
            {/* Decorative elements behind image */}
            <div className="absolute -top-6 -right-6 w-full h-full bg-blue-100/50 rounded-3xl -z-10 blur-xl"></div>
          </div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section id="features" className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-6 tracking-tight">Features</h2>
            <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <FeatureCard 
              icon={<MousePointer2 className="h-7 w-7 text-blue-600" />}
              title="Drag & Drop Tasks"
              description="Easily drag and reposition tasks across your board. Stay fluid and organized."
              color="blue"
            />
            <FeatureCard 
              icon={<Users className="h-7 w-7 text-orange-600" />}
              title="Team Collaboration"
              description="Work together with your team in real time. Share projects and track progress."
              color="orange"
            />
            <FeatureCard 
              icon={<Clock className="h-7 w-7 text-indigo-600" />}
              title="Deadline Tracking"
              description="Set due dates and never miss an important deadline. Stay ahead of your schedule."
              color="indigo"
            />
            <FeatureCard 
              icon={<BarChart3 className="h-7 w-7 text-teal-600" />}
              title="Project Insights"
              description="Get an overview of your project progress and performance with visual charts."
              color="teal"
            />
          </div>


        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-900 pt-20 pb-10 text-slate-400 border-t border-slate-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <CheckSquare className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white tracking-tight">Task Board</span>
              </div>
              <p className="text-sm leading-relaxed max-w-xs">
                The ultimate collaborative task management tool for modern teams who want to ship faster and stay organized.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Product</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#features" className="hover:text-blue-400 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Enterprise</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Solutions</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Company</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Legal</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Security</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p>© 2025 Task Board Inc. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-white transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Sub-components for cleaner structure
const FeatureCard = ({ icon, title, description, color }) => {
  const colorMap = {
    blue: "bg-blue-50 text-blue-600",
    orange: "bg-orange-50 text-orange-600",
    indigo: "bg-indigo-50 text-indigo-600",
    teal: "bg-teal-50 text-teal-600",
  };

  return (
    <div className="group bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-2 transition-all duration-300 flex flex-col sm:flex-row items-center sm:items-start gap-6">
      <div className={`p-4 rounded-2xl flex-shrink-0 transition-transform group-hover:scale-110 ${colorMap[color] || colorMap.blue}`}>
        {icon}
      </div>
      <div className="text-center sm:text-left">
        <h3 className="text-2xl font-bold text-slate-800 mb-3">{title}</h3>
        <p className="text-slate-600 leading-relaxed text-sm md:text-base">{description}</p>
      </div>
    </div>
  );
};

export default Landing;
