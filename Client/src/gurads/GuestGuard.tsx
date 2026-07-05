import { Navigate, Outlet, useOutletContext } from "react-router-dom";
import { useUser } from "../store/user";

export default function GuestGuard() {
    const user = useUser((state) => state.user);
    const context = useOutletContext();

	return <>{!user ? <Outlet context={context}/> : <Navigate to="/" />}</>;
}
