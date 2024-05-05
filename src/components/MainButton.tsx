interface MainButtonProps {
    children: React.ReactNode;
    onClick: () => void;
    className?: string;
    style?: React.CSSProperties;
}
export function MainButton({ children, onClick, className, style }: MainButtonProps) {
    return (
        <button
            className={
                'flex items-center justify-center gap-[12px] z-50 rounded-full px-[16px] py-[12px] text-[14px] font-bold text-neutrals9 cursor-pointer ' +
                className
            }
            style={style || { background: 'var(--line-purple)' }}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
