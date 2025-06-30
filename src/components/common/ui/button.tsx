import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors transition-shadow transition-transform duration-200 ease-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive relative overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-sm hover:shadow-md hover:shadow-cyan-500/20 hover:translate-y-[-1px] hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 hover:brightness-110 active:translate-y-[0px]",
        destructive:
          "bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-sm hover:shadow-md hover:shadow-red-500/20 hover:translate-y-[-1px] hover:bg-gradient-to-r hover:from-red-500 hover:to-rose-500 hover:brightness-110 active:translate-y-[0px]",
        outline:
          "border border-slate-700 bg-transparent text-slate-300 shadow-sm hover:border-cyan-500/50 hover:bg-slate-800/50 hover:text-white hover:shadow-md hover:shadow-cyan-500/10 hover:translate-y-[-1px] active:translate-y-[0px]",
        secondary:
          "bg-slate-800 text-slate-200 shadow-sm hover:bg-slate-700 hover:shadow-md hover:shadow-slate-900/20 hover:translate-y-[-1px] active:translate-y-[0px]",
        ghost:
          "bg-transparent hover:bg-slate-800/70 hover:text-cyan-400 transition-all",
        link: "text-cyan-400 underline-offset-4 hover:underline hover:text-cyan-300 p-0 h-auto",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = ({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
};

export { Button, buttonVariants };
