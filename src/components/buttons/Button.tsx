import Link from 'next/link';
import React from 'react';

type ButtonProps = {
  color: 'primary' | 'secondary' | 'quadary';
  size: 'large' | 'medium' | 'small';
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({ color, size, children, href, onClick, disabled }) => {
  const baseClasses = 'text-center text-lg font-semibold flex items-center justify-center transition-all';
  const colorClasses = color === 'primary' ? 'bg-primary-blue text-white' : color === 'quadary' ? 'bg-quadary-bg' : 'bg-accent-brand bg-opacity-10 text-primary-blue';
  const colorClassesDisabled = color === 'primary' ? 'bg-accent-brand bg-opacity-30 text-disabled text-opacity-55' : 'bg-accent-brand text-primary-blue bg-opacity-30 text-opacity-55';

  let sizeClasses = '';
  switch (size) {
    case 'large':
      sizeClasses = 'w-full py-[14px] px-[21px] rounded-xl';
      break;
    case 'medium':
      sizeClasses = 'w-full py-[10px] px-[18px] rounded-lg';
      break;
    case 'small':
      sizeClasses = 'size-[44px] rounded-full aspect-square';
      break;
    default:
      break;
  }

  const buttonClasses = `${baseClasses} ${sizeClasses} ${colorClasses}`;
  const buttonClassesDisabled = `${baseClasses} ${sizeClasses} ${colorClassesDisabled}`;

  if (href) {
    return (
      <Link href={href} className={disabled ? buttonClassesDisabled : buttonClasses} onClick={onClick}>
          {children}
      </Link>
    );
  }

  return (
    <button
      className={`${disabled ? buttonClassesDisabled : buttonClasses} ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
