import { useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Header from "../components/common/Header";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-[#F4F7FE] font-sans overflow-hidden relative">
      {/* MOBILE OVERLAY */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden animate-in fade-in duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR CONTAINER */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 transform bg-[#1E2640] transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 md:flex-shrink-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 h-full flex flex-col min-w-0">
        <Header onMenuClick={toggleSidebar} />
        
        <div className="flex-1 overflow-y-auto px-4 md:px-8 py-4 md:py-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;