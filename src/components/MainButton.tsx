interface MainButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}
export function MainButton({ children, onClick, className }: MainButtonProps) {
  return <button className={"rounded-full py-[12px] px-[16px] text-neutrals9 text-[14px] " + className} style={{ background: "var(--line-green)" }} onClick={onClick} > {children} </button>;
}
