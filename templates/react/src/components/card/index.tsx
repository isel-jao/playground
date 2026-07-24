import React from "react";
import { twMerge } from "tailwind-merge";

interface CardProps extends React.HTMLAttributes<HTMLElement> {}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={twMerge(
        "bg-card text-card-foreground p-4 rounded-md border",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
