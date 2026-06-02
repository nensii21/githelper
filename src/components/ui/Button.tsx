import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    const variants = {
      primary: 'bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-white border border-[rgba(240,246,252,0.1)] shadow-sm',
      secondary: 'bg-[var(--bg-surface)] hover:bg-[var(--border-default)] text-[var(--text-primary)] border border-[var(--border-default)]',
      ghost: 'bg-transparent hover:bg-[var(--border-default)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
      outline: 'bg-transparent border border-[var(--border-default)] hover:border-[var(--text-secondary)] text-[var(--text-primary)]',
      danger: 'bg-transparent border border-[var(--border-default)] hover:bg-[#da3633] hover:border-[#f85149] text-[#f85149] hover:text-white',
    };

    const sizes = {
      sm: 'px-3 py-1 text-xs',
      md: 'px-4 py-1.5 text-sm',
      lg: 'px-6 py-2 text-base',
      icon: 'p-1.5',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;