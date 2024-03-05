import { useAccountModal } from '@rainbow-me/rainbowkit';
import { forwardRef } from 'react';

import { useRainbowModal } from '@/hooks/useRainbowModal.js';
import { SingletonModalRefCreator } from '@/libs/SingletonModal/index.js';

export const AccountModal = forwardRef<SingletonModalRefCreator>(function AccountModal(_, ref) {
    const { openAccountModal, accountModalOpen } = useAccountModal();

    useRainbowModal(openAccountModal, accountModalOpen, ref);

    return null;
});
