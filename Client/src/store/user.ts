import { create } from "zustand";
import type { UserAttributes } from "../types/users";

interface State {
	user: UserAttributes | null;
}

interface Action {
	setUserState: (newUserState: UserAttributes | null) => void;
}

export const useUser = create<Action & State>()((set) => ({
	user: null,
	setUserState: (newUserState: UserAttributes | null) => set({ user: newUserState }),
}));
