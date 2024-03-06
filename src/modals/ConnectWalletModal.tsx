import { useConnectModal } from '@rainbow-me/rainbowkit';
import { forwardRef } from 'react';

import { useRainbowModal } from '@/hooks/useRainbowModal.js';
import type { SingletonModalRefCreator } from '@/libs/SingletonModal/index.js';

export const ConnectWalletModal = forwardRef<SingletonModalRefCreator>(function ConnectWalletModal(_, ref) {
    const { openConnectModal, connectModalOpen } = useConnectModal();

    useRainbowModal(openConnectModal, connectModalOpen, ref);

    return null;
});
