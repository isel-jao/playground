import React from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button({ className, children, ...props }: ButtonProps) {
  return (
    <button
      className={twMerge(
        "bg-primary hover:brightness-110 active:brightness-125 text-primary-foreground",
        "flex justify-center items-center gap-2",
        "font-semibold capitalize",
        " px-3 py-1.5 rounded",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
