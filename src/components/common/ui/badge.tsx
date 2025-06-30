import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap shrink-0 transition-all duration-200 ease-out outline-none focus-visible:ring-2 focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive relative overflow-hidden [&_svg]:pointer-events-none [&_svg]:size-3 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-sm hover:shadow-md hover:shadow-cyan-500/20 hover:brightness-110 [a&]:hover:translate-y-[-1px] [button&]:hover:translate-y-[-1px]",
        secondary:
          "bg-slate-800 text-slate-200 shadow-sm border border-slate-700/50 hover:bg-slate-700 hover:shadow-md hover:shadow-slate-900/20 [a&]:hover:translate-y-[-1px] [button&]:hover:translate-y-[-1px]",
        destructive:
          "bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-sm hover:shadow-md hover:shadow-red-500/20 hover:brightness-110 [a&]:hover:translate-y-[-1px] [button&]:hover:translate-y-[-1px]",
        success:
          "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-sm hover:shadow-md hover:shadow-emerald-500/20 hover:brightness-110 [a&]:hover:translate-y-[-1px] [button&]:hover:translate-y-[-1px]",
        warning:
          "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm hover:shadow-md hover:shadow-amber-500/20 hover:brightness-110 [a&]:hover:translate-y-[-1px] [button&]:hover:translate-y-[-1px]",
        info: "bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-sm hover:shadow-md hover:shadow-sky-500/20 hover:brightness-110 [a&]:hover:translate-y-[-1px] [button&]:hover:translate-y-[-1px]",
        outline:
          "border border-slate-700 bg-transparent text-slate-300 shadow-sm hover:border-cyan-500/50 hover:bg-slate-800/50 hover:text-white hover:shadow-md hover:shadow-cyan-500/10 [a&]:hover:translate-y-[-1px] [button&]:hover:translate-y-[-1px]",
        ghost:
          "bg-slate-800/30 text-slate-300 hover:bg-slate-800/60 hover:text-cyan-400 border border-slate-700/30 hover:border-slate-600/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Badge = ({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) => {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
};

export { Badge, badgeVariants };
