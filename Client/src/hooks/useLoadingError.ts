import { useEffect, useState } from "react";

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

export function useHideScroller() {
	useEffect(() => {
		document.body.style.overflow = "hidden";

		return () => {
			document.body.style.overflow = "";
		};
	}, []);
}
