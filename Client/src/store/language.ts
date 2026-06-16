import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
	language: "bg" | "en";
}

interface Action {
	toggleLanguage: (state: State) => void;
}

export const useLanguage = create<State & Action>()(
	persist(
		(set) => ({
			language: "bg",
			toggleLanguage: () => {
				set((state) => ({
					language: state.language === "en" ? "bg" : "en",
				}));
			},
		}),
		{
			name: "language",
		},
	),
);
