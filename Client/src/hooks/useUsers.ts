import { useEffect, useState } from "react";
import { changePassword, editUser, getUserById, login, logout, register } from "../api/users";
import type { UserAttributes } from "../types/users";
import { useLoadingError } from "./useLoadingError";

export function useRegister() {
	return async function (data: Object) {
		return await register(data);
	};
}

export function useLogin() {
	return async function (data: Object) {
		return await login(data);
	};
}

export function useLogout() {
	return async function () {
		return await logout();
	};
}

export function useGetUserById(initValues: null, userId: string | undefined) {
	const [user, setUser] = useState<UserAttributes | null>(initValues);
	const { loading, setLoading, error, setError } = useLoadingError();

	useEffect(() => {
		const abortController = new AbortController();
		const { aborted } = abortController.signal;
		(async () => {
			try {
				setLoading(true);
				if (!aborted) {
					const curUser = await getUserById(userId);
					setUser(curUser);
				}
				setLoading(false);
			} catch (err) {
				setLoading(false);
				setError(true);
			}
		})();

		return () => abortController.abort();
	}, [userId]);

	return {
		user,
		setUser,
		loading,
		error,
	};
}

export function useEditUser() { 
	return async function (userId: string | undefined, data: Object) {
		return await editUser( userId,data);
	}
}

export function useChangePassword() {
	return async function (userId: string | undefined, data: Object) {
		return await changePassword(userId, data);
	};
}
