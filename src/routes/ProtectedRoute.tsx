import { Navigate } from "react-router-dom";
import { type ReactElement } from "react";

interface Props {
    children: ReactElement;
}

const ProtectedRoute = ({ children }: Props) => {
    const user = localStorage.getItem("user");

    if (!user) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
