import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";


interface AuthStore {
    email : string,
    setEmail : (email : string) => void;
}

interface AuthPersist {
    email : string,
    setEmail : (email : string) => void;
    clearEmail : () => void;
}

export const useAuthStore = create<AuthStore> ((set) => ({
    email: "",
    setEmail : (email : string) => set(() => ({ email })), 
}));

export const useAuthPersist = create<AuthPersist>()(
    persist(
        (set) => ({
            email: "",
            setEmail : (email : string) => set(() => ({ email })),
            clearEmail : () => set(() => ({ email : " "})),
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => localStorage), // syntax for storing to localstorage
        }
    ),
)