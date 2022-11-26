//https://www.youtube.com/watch?v=oUZjO00NkhY&t=1443s

import {useLocation, Navigate, Outlet} from "react-router-dom";
import useAuth from "./useAuth";

const RequireAuth = () => {
    const {auth} = useAuth();
    const location = useLocation();

    return (
        auth.username
            ? <Outlet />
            : <Navigate to="/login" state={{from: location}} replace />

    );
}

export default RequireAuth;