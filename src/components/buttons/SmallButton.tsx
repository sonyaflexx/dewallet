import Link from 'next/link';
import React from 'react';

type ButtonProps = {
  color: 'primary' | 'secondary';
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
};

const SmallButton: React.FC<ButtonProps> = ({ color, children, href, onClick, disabled }) => {
  const buttonClasses = `rounded-full aspect-square text-center text-lg font-semibold size-[44px] flex items-center justify-center ${color === 'primary' ? 'bg-primary-blue text-white' : 'bg-accent-brand bg-opacity-10 text-primary-blue'}`;
  const buttonClassesDisabled = `rounded-full aspect-square text-center text-lg font-semibold size-[44px] flex items-center justify-center ${color === 'primary' ? 'bg-accent-brand bg-opacity-30 text-disabled text-opacity-55' : 'bg-accent-brand text-primary-blue bg-opacity-30 text-opacity-55'}`;

  if (href) {
    return (
      <Link href={href} className={`transition-all ${disabled ? buttonClassesDisabled : buttonClasses}`} onClick={onClick}>
          {children}
      </Link>
    );
  }

  return (
    <button
      className={`${buttonClasses} ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default SmallButton;