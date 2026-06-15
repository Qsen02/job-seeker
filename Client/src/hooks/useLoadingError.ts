import { useState } from "react";

export function useLoadingError(
	initLoading: boolean = false,
	initError: boolean = false,
) {
	const [loading, setLoading] = useState(initLoading);
	const [error, setError] = useState(initError);

	return {
		loading,
		setLoading,
		error,
		setError,
	};
}
