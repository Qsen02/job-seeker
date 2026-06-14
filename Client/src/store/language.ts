import { create } from "zustand";

interface State {
	language: "bg" | "en";
}

interface Action {
	toggleLanguage: (state: State) => void;
}

export const useLanguage = create<State & Action>()((set) => ({
	language: "en",
	toggleLanguage: () =>
		set((state) => ({ language: state.language === "en" ? "bg" : "en" })),
}));
