import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
        green:
          'border-transparent bg-green-500 text-green-foreground hover:bg-green-600',
        red:
          'border-transparent bg-red-500 text-red-foreground hover:bg-red-600',
        blue:
          'border-transparent bg-blue-500 text-blue-foreground hover:bg-blue-600',
        yellow:
          'border-transparent bg-yellow-500 text-yellow-foreground hover:bg-yellow-600',
        purple:
          'border-transparent bg-purple-500 text-purple-foreground hover:bg-purple-600',
        gray:
          'border-transparent bg-gray-500 text-gray-foreground hover:bg-gray-600',
        pink:
          'border-transparent bg-pink-500 text-pink-foreground hover:bg-pink-600'
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
