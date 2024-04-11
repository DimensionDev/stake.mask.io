import { Link } from '@/esm/Link.js';

export function BottomBar() {
    return (
        <div className="flex items-center justify-between px-[24px] py-[32px] text-[12px] text-neutrals4">
            <div>Since 2019 to Now ｜ Mask.io</div>
            <div className="flex items-center gap-[16px]">
                <Link href={'#'}>Terms of Use</Link>
                <Link href={'#'}>Privacy Policy</Link>
                <Link href={'#'}>Cookie Policy</Link>
            </div>
        </div>
    );
}
