import React from "react";
import { Link } from "@/esm/Link.js";

const navigation = [
  { name: "Stake", path: "/stake" },
  { name: "FAQs", path: "/faqs" },
  { name: "About", path: "/about" },
];

export interface NavigationHeaderProps { }

export function NavTabs() {
  return (
    <nav className="flex items-center gap-[36px] full" aria-label="Global">
      {navigation.map((item) => (
        <Link
          className={`text-[14px] font-normal leading-[16px] text-neutrals5 hover:text-neutrals1 transition-colors duration-200`}
          key={item.path}
          href={item.path}
        >
          <span>{item.name}</span>
        </Link>
      ))}
    </nav>
  );
}
