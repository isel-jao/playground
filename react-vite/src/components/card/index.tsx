import React from "react";
import { twMerge } from "tailwind-merge";

interface CardProps extends React.HTMLAttributes<HTMLElement> {
  ref?: React.RefObject<HTMLDivElement | null>;
}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={twMerge(
        "bg-card text-card-foreground p-4 rounded-lg shadow-lg",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
