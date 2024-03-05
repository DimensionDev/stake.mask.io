import { SingletonModal } from '@/libs/SingletonModal/index.js';
import type { ConfirmModalCloseProps, ConfirmModalOpenProps } from '@/modals/ConfirmModal.js';

export const AccountModalRef = new SingletonModal();
export const ConnectWalletModalRef = new SingletonModal();
export const ChainModalRef = new SingletonModal();
export const ConfirmModalRef = new SingletonModal<ConfirmModalOpenProps, ConfirmModalCloseProps>();
