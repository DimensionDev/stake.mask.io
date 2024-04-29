interface MainButtonProps {
    children: React.ReactNode;
    onClick: () => void;
    className?: string;
}
export function MainButton({ children, onClick, className }: MainButtonProps) {
    return (
        <button
            className={'rounded-full px-[16px] py-[12px] flex items-center justify-center gap-[12px] text-[14px] font-bold text-neutrals9 ' + className}
            style={{ background: 'var(--line-purple)' }}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
