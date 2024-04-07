import { Image } from '@/esm/Image.js';
import Twitter from '@/assets/logos/twitter.svg';
import Github from '@/assets/logos/github.svg';
import Discord from '@/assets/logos/discord.svg';
import Telegram from '@/assets/logos/telegram.svg';
import Medium from '@/assets/logos/medium.svg';
import Reddit from '@/assets/logos/reddit.svg';
import Youtube from '@/assets/logos/youtube.svg';
import Facebook from '@/assets/logos/facebook.svg';

const iconsList = [
    { icon: <Twitter width={40} height={40} />, link: 'https://twitter.com/realmaskbook' },
    { icon: <Github width={40} height={40} />, link: ' ' },
    { icon: <Discord width={40} height={40} />, link: ' ' },
    { icon: <Telegram width={40} height={40} />, link: ' ' },
    { icon: <Medium width={40} height={40} />, link: ' ' },
    { icon: <Reddit width={40} height={40} />, link: ' ' },
    { icon: <Youtube width={40} height={40} />, link: ' ' },
    { icon: <Facebook width={40} height={40} />, link: ' ' },
];

export function Info() {
    return (
        <div className="flex border-y-[1px] border-neutrals6 px-[36px] pb-[48px] pt-[64px]">
            <div className="flex flex-1 flex-col gap-[32px]">
                <Image src="/logo.svg" alt="Mask Network" width={120} height={35} />
                <div className="w-[256px] text-[40px] leading-[32px] text-neutrals2">
                    Your Portal To The New, Open Internet.
                </div>
            </div>
            <div className="flex flex-1 flex-col gap-[32px]">
                <div className="text-[16px] text-neutrals2">Integrations</div>
                <div className="text-[16px] text-neutrals4">Github</div>
            </div>
            <div className="flex flex-1 flex-col gap-[32px]">
                <div className="text-[16px] text-neutrals2">Help</div>
                <div className="text-[16px] text-neutrals4">FAQs</div>
                <div className="text-[16px] text-neutrals4">Support</div>
            </div>
            <div className="flex flex-1 flex-col gap-[32px]">
                <div className="text-[16px] text-neutrals2">Contact Us</div>
                <div className="flex gap-[8px]">
                    {iconsList.map((item, index) => (
                        <a key={index} href={item.link}>
                            {item.icon}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
