import { create } from "zustand";
import { getLanguage, setLanguage } from "../utils/languageHelper";

interface State {
	language: "bg" | "en";
}

interface Action {
	toggleLanguage: (state: State) => void;
}

export const useLanguage = create<State & Action>()((set) => ({
	language: getLanguage() ?? "bg",
	toggleLanguage: (state) => {
		set((state) => ({ language: state.language === "en" ? "bg" : "en" }));
		setLanguage(state.language);
	},
}));
