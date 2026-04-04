import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "discover-hover-sheen-premium inline-flex items-center justify-center whitespace-nowrap border border-[#D1D5DB] font-medium text-black transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFDA4D]",
  {
    variants: {
      size: {
        category: "rounded-full px-5 py-2.5 text-base",
        filter: "rounded-full px-3 py-1.5 text-sm",
      },
      active: {
        true: "bg-[#FFDA4D] border-[#111827]",
        false:
          "bg-white hover:bg-[linear-gradient(180deg,_#FFFDEA_-10.32%,_#FFF9BB_50.44%,_#FFE65C_104%,_#FFD500_155.95%)] hover:border-[#FFEFB3]",
      },
    },
    defaultVariants: {
      size: "filter",
      active: false,
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, size, active, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={cn(buttonVariants({ size, active }), className)} {...props} />;
}

