import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";


interface AuthStore {
    email : string,
    setEmail : (email : string) => void;
}
interface AuthPersist {
    email : string,
    role : string,
    setEmail : (email : string) => void;
    setRole : (role: string) => void;
    clearEmail : () => void;
    clearRole : () => void;
}

interface AuthUpdate {
    id: string,
    email: string,
    name: string,
    username: string,
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
            username: "",
            setId : (id : string) => set(() => ({ id })),
            setEmail : (email: string) => set(() => ({ email })),
            setName: (name : string) => set(() => ({ name })),
            setUserName : (username : string) => set(() => ({ username })),
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
            role : "",
            setEmail : (email : string) => set(() => ({ email })),
            setRole : (role :string) => set(() => ({ role })),
            clearEmail : () => set(() => ({ email : " "})),
            clearRole : () => set(() => ({ role : " " })),
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => localStorage), // syntax for storing to localstorage
        }
    ),
);