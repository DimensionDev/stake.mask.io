import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { createSelectors } from '@/helpers/createSelector.js';

interface StakeModalState {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const useStakeModalStateBase = create<StakeModalState, [['zustand/immer', never]]>(
    immer((set) => ({
        isOpen: false,
        setIsOpen: (isOpen) => {
            set((state) => {
                state.isOpen = isOpen;
            });
        },
    })),
);

export const useStakeModalStore = createSelectors(useStakeModalStateBase);
