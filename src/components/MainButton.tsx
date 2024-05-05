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
                'z-50 flex cursor-pointer items-center justify-center gap-[12px] rounded-full px-[16px] py-[12px] text-[14px] font-bold text-neutrals9 ' +
                className
            }
            style={style || { background: 'var(--line-purple)' }}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
