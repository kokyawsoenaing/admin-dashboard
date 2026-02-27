import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import Dashboard from "./pages/dashboard/index";
import Projects from "./pages/projects/index";
import Users from "./pages/users/index";
import ProtectedRoute from "./routes/ProtectedRoute";
import MainLayout from "./components/layout/MainLayout";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />

            {/* Dashboard, Projects, Users */}
            <Route
                element={
                    <ProtectedRoute>
                        <MainLayout />
                    </ProtectedRoute>
                }
            >
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/users" element={<Users />} />
            </Route>
        </Routes>
    );
};

export default App;
