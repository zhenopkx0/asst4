import type { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  variant?: 'primary' | 'grey';
  disabled?: boolean;
  onClick: () => void;
};

const baseStyles =
  'inline-block px-6 py-3 rounded-2xl transition-all duration-200 font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500/40';

const variants = {
  primary:
    'bg-black text-white hover:bg-gray-900 active:bg-gray-800',
  grey:
    'bg-gray-200 text-gray-900 hover:bg-gray-300 active:bg-gray-400',
  purple:
    'bg-purple-600 text-white hover:bg-purple-500 active:bg-purple-400',
};
export const Button = ({ children, variant = 'primary', disabled = false, onClick }: ButtonProps) => {
  return (
    <button
      type="button"
      className={`${baseStyles} ${disabled ? variants['grey'] : variants[variant]}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};