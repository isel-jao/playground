import React from "react";
import { twMerge } from "tailwind-merge";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface CardProps extends React.HTMLAttributes<HTMLElement> {}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={twMerge(
        "bg-card text-card-foreground p-4 rounded-md shadow-sm border border-border",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
