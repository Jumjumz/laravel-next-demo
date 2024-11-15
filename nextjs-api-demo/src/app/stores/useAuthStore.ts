import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import Email from "../components/email";


interface AuthStore {
    email : string,
    setEmail : (email : string) => void;
}
interface AuthPersist {
    email : string,
    setEmail : (email : string) => void;
    clearEmail : () => void;
}

interface AuthUpdate {
    id: string,
    email: string,
    name: string,
    userName: string,
    setId: (id: string) => void;
    setEmail: (email: string) => void;
    setName: (name: string) => void;
    setUserName: (userName: string) => void;
}

export const useAuthStore = create<AuthStore> ((set) => ({
    email : "",
    setEmail : (email : string) => set(() => ({ email })), 
}));

export const useAuthUpdate = create<AuthUpdate> ()(
    persist(
        (set) => ({
            id: "",
            email: "",
            name: "",
            userName: "",
            setId : (id : string) => set(() => ({ id })),
            setEmail : (email: string) => set(() => ({ email })),
            setName: (name : string) => set(() => ({ name })),
            setUserName : (userName : string) => set(() => ({ userName })),
        }),
        {
            name: 'auth-update',
            storage: createJSONStorage(() => sessionStorage),
        }
    ),
);

export const useAuthPersist = create<AuthPersist> ()(
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
);