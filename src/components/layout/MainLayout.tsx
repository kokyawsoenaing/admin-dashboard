import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const MainLayout = () => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
    };

    return (
        <div className="flex min-h-screen bg-gray-50 overflow-x-hidden">
            <Sidebar sidebarOpen={sidebarOpen} />

            <div className="flex-1 flex flex-col min-w-0">
                <Topbar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    user={user}
                    handleLogout={handleLogout}
                />

                <main className="flex-1 p-8 overflow-hidden">
                    {/*  Dashboard, Projects, Users */}
                    <Outlet context={{ sidebarOpen }} />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
