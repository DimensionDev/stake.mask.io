'use client';

import { memo } from 'react';

import { AccountModal } from '@/modals/AccountModal.js';
import { ChainModal } from '@/modals/ChainModal.js';
import { ConfirmModal } from '@/modals/ConfirmModal.js';
import { ConnectWalletModal } from '@/modals/ConnectWalletModal.js';
import * as controls from '@/modals/controls.js';

export const Modals = memo(function Modals() {
    return (
        <>
            <AccountModal ref={controls.AccountModalRef.register} />
            <ChainModal ref={controls.ChainModalRef.register} />
            <ConnectWalletModal ref={controls.ConnectWalletModalRef.register} />
            <ConfirmModal ref={controls.ConfirmModalRef.register} />
        </>
    );
});
