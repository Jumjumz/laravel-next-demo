import { create } from "zustand";


interface AuthStore {
    email : string,
    setEmail : (email : string) => void;
}

export const useAuthStore = create<AuthStore> ((set) => ({
    email: "",
    setEmail : (email : string) => set(() => ({ email })), 
}));