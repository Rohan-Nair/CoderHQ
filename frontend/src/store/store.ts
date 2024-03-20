import { create } from 'zustand'

interface AuthState {
    user: {
        name: string,
        email: string,
    } | null,


}

export const useAuthStore = create<AuthState>(() => ({
    user: null,
}))