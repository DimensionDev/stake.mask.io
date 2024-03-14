import { Image } from '@/esm/Image.js';

interface SocialAccountInfoProps {
  account: {
    name: string;
    email: string;
    image: string;
  };
}
export function SocialAccountInfo({ account }: SocialAccountInfoProps) {
  return (
    <div className="flex h-[40px] w-[40px] border-[2px] border-neutrals6">
      <Image src={account.image} alt={account.name} width={40} height={40} className="rounded-[99px]" />
    </div>
  );
}
