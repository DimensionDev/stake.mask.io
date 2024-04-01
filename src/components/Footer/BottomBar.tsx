import { Link } from '@/esm/Link.js'
export const BottomBar = () => {
  return <div className="flex py-[32px] px-[24px] items-center justify-between text-neutrals4 text-[12px]">
    <div>Since 2019 to Now ｜ Mask.io</div>
    <div className="flex items-center gap-[16px]">
      <Link href={'#'}>Terms of Use</Link>
      <Link href={'#'}>Privacy Policy</Link>
      <Link href={'#'}>Cookie Policy</Link>
    </div>
  </div>
}
