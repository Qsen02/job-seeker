import { Navigate, Outlet, useOutletContext } from "react-router-dom";
import { useUser } from "../store/user";

export default function AdminGuard() {
    const user = useUser((state) => state.user);
    const context = useOutletContext();

	return (
		<>{user?.role === "admin" ? <Outlet context={context}/> : <Navigate to="/" />}</>
	);
}
