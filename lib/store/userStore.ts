import { createStore } from 'zustand-x';

interface UserState {
    isAuthenticated: boolean;
    user: {
        id: string;
        name: string;
        email: string;
    } | null;
}

export const userStore = createStore<UserState>({
    isAuthenticated: false,
    user: null,
}, {
    name: 'user',
    devtools: { enabled: true },
});

export const useUserStore = userStore.useStore;
export const useUserTrackedStore = userStore.useTrackedStore;
