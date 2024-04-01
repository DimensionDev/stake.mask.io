import MaskIcon from '@/assets/logos/mask.svg';
export function StakeTokenInfo() {
  return (
    <div
      className="flex w-full flex-col rounded-[16px] p-[16px] text-neutrals8"
      style={{ background: 'var(--line-green)' }}
    >
      <div className="flex justify-between text-neutrals8 text-[12px]">
        <div>Stake Token</div>
        <div>Liquidity</div>
      </div>
      <div className="flex justify-between mt-[8px]">
        <div className="flex items-center gap-[4px]">
          <MaskIcon className="w-[36px] h-[36px]" />
          <div className="text-[32px] leading-[48px]">MASK</div>
        </div>
        <div className='text-[40px] leading-[48px]'>2.0M</div>
      </div>
      <div className='w-full h-[1px] bg-black/10 rounded-[99px] mt-[12px]' />
      <div className='grid grid-cols-2 grid-rows-2 lg:grid-cols-4 lg:grid-rows-1 gap-[16px] mt-[12px]'>
        <div className='flex flex-col items-center'>
          <div className='text-[12px] text-neutrals8'>Wallet Balance</div>
          <div className='text-[24px] text-neutrals8'>45.4K</div>
        </div>
        <div className='flex flex-col items-center'>
          <div className='text-[12px] text-neutrals8'>Staked</div>
          <div className='text-[24px] text-neutrals8'>19.39K</div>
        </div>
        <div className='flex flex-col items-center'>
          <div className='text-[12px] text-neutrals8'>APY</div>
          <div className='text-[24px] text-neutrals8'>100.0M</div>
        </div>
        <div className='flex flex-col items-center'>
          <div className='text-[12px] text-neutrals8'>Time Left</div>
          <div className='text-[24px] text-neutrals8'>10.0M</div>
        </div>
      </div>
    </div>
  );
}
