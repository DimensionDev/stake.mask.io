'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useStakeModalStore } from '@/store/useStakeModalStore.js';
import { StakeTokenInput } from './StakeTokenInput/index.js';

export function StakeModal() {
    const isOpen = useStakeModalStore((state) => state.isOpen);
    const setIsOpen = useStakeModalStore((state) => state.setIsOpen);
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-50"
                onClose={() => {
                    setIsOpen(false);
                }}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="z-[999] w-full max-w-[630px] transform overflow-hidden rounded-2xl bg-neutrals8 p-[24px] text-left align-middle shadow-xl transition-all">
                                <StakeTokenInput onClose={() => setIsOpen(false)} />
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
