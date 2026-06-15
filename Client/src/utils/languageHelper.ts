export function getLanguage() {
	const language = localStorage.getItem("language");

	return language as "bg" | "en" | null;
}

export function setLanguage(lang: "bg" | "en") {
	localStorage.setItem("language", JSON.stringify(lang));
}
