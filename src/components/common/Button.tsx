import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'secondary',
  size = 'md',
  isLoading = false,
  leftIcon,
  disabled,
  style,
  ...rest
}) => {
  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'primary':
        return { backgroundColor: '#38bdf8', color: '#0f172a', border: '1px solid #38bdf8' };
      case 'danger':
        return { backgroundColor: '#ef4444', color: '#ffffff', border: '1px solid #dc2626' };
      case 'ghost':
        return { backgroundColor: 'transparent', color: '#94a3b8', border: '1px solid transparent' };
      default:
        return { backgroundColor: '#1e293b', color: '#f8fafc', border: '1px solid #334155' };
    }
  };

  const getSizeStyles = (): React.CSSProperties => {
    switch (size) {
      case 'sm':
        return { padding: '4px 8px', fontSize: '0.8125rem' };
      case 'lg':
        return { padding: '10px 20px', fontSize: '1rem' };
      default:
        return { padding: '6px 14px', fontSize: '0.875rem' };
    }
  };

  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    borderRadius: '6px',
    fontWeight: 500,
    cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
    opacity: disabled || isLoading ? 0.6 : 1,
    transition: 'all 0.15s ease-in-out',
    ...getVariantStyles(),
    ...getSizeStyles(),
    ...style,
  };

  return (
    <button disabled={disabled || isLoading} style={baseStyle} {...rest}>
      {leftIcon && <span aria-hidden="true">{leftIcon}</span>}
      {isLoading ? 'Loading...' : children}
    </button>
  );
};
