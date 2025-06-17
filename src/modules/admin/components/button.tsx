
import React from "react";
import Link from "next/link";

interface TrapezoidButtonProps {
    text: string;
    color: string;
    href?: string;
    className?: string;
}

const TrapezoidButton: React.FC<TrapezoidButtonProps> = ({
    text,
    color,
    href,
    className = ""
}) => {
    const buttonClass = `relative w-[320px] h-[150px] border-3 border-black flex items-center justify-center px-6 ${className}`;
    const buttonStyle = {
        clipPath: 'polygon(0 0, 100% 0, 85% 100%, 15% 100%)',
        backgroundColor: color
    };

    const content = (
        <div className="relative w-full h-full flex items-center justify-center">
            <span
                className="text-white text-2xl font-bold absolute"
                style={{
                    left: '50%',
                    transform: 'translateX(-50%)'
                }}
            >
                {text}
            </span>
        </div>
    );

    return href ? (
        <Link href={href} className={buttonClass} style={buttonStyle}>
            {content}
        </Link>
    ) : (
        <button className={buttonClass} style={buttonStyle}>
            {content}
        </button>
    );
};

export default TrapezoidButton;