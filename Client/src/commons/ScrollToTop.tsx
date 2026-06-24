import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
	const { key } = useLocation();

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "instant" });
	}, [key]);

	return null;
}
