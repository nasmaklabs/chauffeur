import { createStore } from 'zustand-x';

interface LoadingState {
    isLoading: boolean;
}

const initialState: LoadingState = {
    isLoading: true, // Start with loading true to show loader on initial page load
};

export const loadingStore = createStore<LoadingState>(initialState, {
    name: 'loading',
    devtools: { enabled: true },
});

export const useLoadingStore = loadingStore.useStore;

