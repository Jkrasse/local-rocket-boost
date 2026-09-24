import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-pill text-base font-semibold tracking-[-0.01em] leading-none border-[1.5px] border-transparent ring-offset-background transition-[background,color,border-color,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-[15px] [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-200 hover:[&_svg]:translate-x-[3px]",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary-hover hover:text-white",
        hero: "bg-primary text-white hover:bg-primary-hover hover:text-white",
        outline: "bg-transparent text-foreground border-foreground hover:bg-foreground hover:text-background",
        secondary: "bg-transparent text-foreground border-foreground hover:bg-foreground hover:text-background",
        light: "bg-background text-primary-hover hover:bg-white hover:text-primary-hover",
        outlineLight: "bg-transparent text-background border-background/40 hover:border-background hover:text-background",
        ghost: "bg-transparent text-ink-soft hover:text-foreground hover:bg-background-warm",
        dark: "bg-foreground text-background hover:bg-foreground/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-[50px] px-6",
        sm: "h-10 px-[18px] text-[15px]",
        lg: "h-14 px-7",
        xl: "h-14 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
