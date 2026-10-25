import { cn } from '../../lib/media'

const variants = {
  default: 'bg-primary text-primary-foreground hover:bg-primary-hover shadow-[0_1px_0_rgba(255,255,255,.25)_inset,0_6px_16px_-6px_rgba(217,20,63,.6)]',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-blush-200/70',
  outline: 'border border-input bg-white/60 text-foreground hover:bg-blush-100',
  ghost: 'text-foreground hover:bg-blush-100',
  light: 'bg-blush-100 text-cherry-deep hover:bg-white',
  ink: 'bg-wine text-blush-100 hover:bg-ember',
}
const sizes = {
  sm: 'h-9 px-3.5 text-sm',
  md: 'h-11 px-5 text-[15px]',
  lg: 'h-12 px-7 text-base',
}

export function Button({ variant = 'default', size = 'md', className, ...props }) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap select-none',
        'transition-[background,transform,box-shadow] duration-150 active:scale-[.97]',
        'disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  )
}
