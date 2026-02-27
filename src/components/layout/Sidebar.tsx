import { navItems } from "../nav/navItems";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = ({ sidebarOpen }: { sidebarOpen: boolean }) => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <aside
            className="min-h-screen flex flex-col shrink-0 overflow-hidden transition-all duration-300 ease-in-out"
            style={{
                backgroundColor: "#111827",
                width: sidebarOpen ? "256px" : "0px",
                opacity: sidebarOpen ? 1 : 0,
                visibility: sidebarOpen ? "visible" : "hidden",
            }}
        >
            <div className="px-6 py-5">
                <p className="text-xs tracking-widest uppercase text-gray-400">
                    FRAME
                </p>
                <p className="text-white font-bold text-lg">Studio Shell</p>
            </div>

            <nav className="flex-1 px-3 py-4 space-y-1">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;

                    return (
                        <button
                            key={item.label}
                            onClick={() => navigate(item.path || "/")}
                            className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg text-left transition-all ${
                                isActive
                                    ? "bg-gray-700 text-white"
                                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                            }`}
                        >
                            <span>{item.icon}</span>
                            <span>
                                <p className="text-sm font-semibold">
                                    {item.label}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {item.sub}
                                </p>
                            </span>
                        </button>
                    );
                })}
            </nav>
        </aside>
    );
};

export default Sidebar;
