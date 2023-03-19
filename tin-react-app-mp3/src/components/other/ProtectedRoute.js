import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../helper/authHelper";

function ProtectedRoute({children}) {
    if (!isAuthenticated()) {
        return <Navigate to="/login" />
    }
    return children
}

export default ProtectedRoute