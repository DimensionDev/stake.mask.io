import { Image } from '@/esm/Image.js';
import { Info } from './Info.js';
import { BottomBar } from './BottomBar.js';
export function Footer() {
    return (
        <div className="hidden w-full flex-col bg-black md:flex">
            <div className="relative aspect-[6] w-full">
                <Image src="/masknetwork.png" alt="Mask Network" layout="fill" />
            </div>
            <Info />
            <BottomBar />
        </div>
    );
}
