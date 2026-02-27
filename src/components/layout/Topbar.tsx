import { Menu, LogOut } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface User {
    name: string;
    email: string;
    loginTime?: string;
}

interface TopbarProps {
    sidebarOpen: boolean;
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
    user: User;
    handleLogout: () => void;
}

const Topbar = ({
    sidebarOpen,
    setSidebarOpen,
    user,
    handleLogout,
}: TopbarProps) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const avatarLetter = (user.name || user.email || "H")[0].toUpperCase();

    return (
        <header className="bg-white px-8 py-4 flex justify-between items-center">
            {/* Left: Sidebar toggle + Title */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => setSidebarOpen((prev) => !prev)}
                    className="text-gray-500 hover:text-gray-800 transition-colors"
                    title={sidebarOpen ? "Close sidebar" : "Open sidebar"}
                >
                    <Menu className="w-5 h-5" />
                </button>
                <h1 className="text-2xl font-bold text-gray-800">
                    Frame Layout
                </h1>
            </div>
            <div className="flex items-center gap-3">
                <div className="text-sm text-gray-500">
                    {user.loginTime ? ` ${user.loginTime}` : "Not logged in"}
                </div>

                {/* Right: User dropdown */}
                <div
                    className="relative border-2 border-gray-200 shadow-sm rounded-full px-2 cursor-pointer hover:bg-gray-100 transition-colors"
                    ref={dropdownRef}
                >
                    <button
                        onClick={() => setDropdownOpen((prev) => !prev)}
                        className="flex items-center gap-3 rounded-xl px-2 py-1.5 hover:bg-gray-100 transition-colors"
                    >
                        {/* Avatar */}
                        <div
                            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                            style={{ backgroundColor: "#2ecc8f" }}
                        >
                            {avatarLetter}
                        </div>
                        {/* User info */}
                        <div className="text-left">
                            <p className="text-sm font-semibold text-gray-800 leading-tight">
                                {user.name || user.email || "hello@gmail.com"}
                            </p>
                            <p className="text-xs text-gray-400">admin</p>
                        </div>
                        {/* Chevron */}
                        <ChevronDown
                            className={`w-4 h-4 text-gray-400 ml-1 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                        />
                    </button>

                    {/* Dropdown */}
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                            <button
                                onClick={() => {
                                    setDropdownOpen(false);
                                    handleLogout();
                                }}
                                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors rounded-xl"
                            >
                                <LogOut className="w-4 h-4" />
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Topbar;
