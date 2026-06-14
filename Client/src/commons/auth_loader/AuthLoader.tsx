import { useEffect, useState } from "react";
import { useUser } from "../../store/user";
import { checkUser } from "../../api/users";
import Loader from "../loader/Loader";

export default function AuthLoader({ children }: React.PropsWithChildren) {
	const setUserState = useUser((state) => state.setUserState);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadUser = async () => {
			try {
				const user = await checkUser();
				setUserState(user);
			} catch {
				setUserState(null);
			} finally {
				setLoading(false);
			}
		};

		loadUser();
	}, []);

	if (loading) {
		return <Loader />;
	}

	return children;
}
