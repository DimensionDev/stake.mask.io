import { Image } from '@/esm/Image.js';

export function ConnectWalletButton() {
    return (
        <button
            className=" flex items-center gap-[4px] rounded-lg px-[24px] py-[12px] text-center text-[14px] font-normal leading-[16px] text-neutrals9"
            style={{ background: 'var(--line-green)' }}
            onClick={() => {}}
        >
            <div className={`flex rounded-[99px] bg-neutrals9 p-[8px]`}>
                <Image src="/wallet.svg" alt="Wallet" width={20} height={20} />
            </div>
            Connect your wallet
        </button>
    );
}
