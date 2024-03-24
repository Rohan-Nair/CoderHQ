import { create } from 'zustand'

interface AuthState {
    user: {
        name: string,
        email: string,
        pfp: string
    } | null,


}

export const useAuthStore = create<AuthState>(() => ({
    user: null,
}))


interface ProblemsState {
    problems: {
        name: string,
        title: string,
        description: string,
        input: string,
        output: string,
    }[]
}

export const useProblemsStore = create<ProblemsState>(() => ({
    problems: [],
}))


interface userPfpState {
    pfp: string
}

export const useUserPfpStore = create<userPfpState>(() => ({
    pfp: ''
}))