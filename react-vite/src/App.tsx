import { Card } from "@/components/card";

export default function App() {
  return (
    <main className="container grid place-items-center ">
      <ToggleThemeButton className="mb-4" />
      <Card className=" w-120 aspect-video">Hello,d Vite + React!</Card>
    </main>
  );
}

import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ToggleThemeButtonProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "children"
> {}

export function ToggleThemeButton({
  className,
  ...props
}: ToggleThemeButtonProps) {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "");

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    const mode = e.currentTarget.getAttribute("data-theme") || "";
    if (mode) {
      document.documentElement.classList.remove(
        mode === "dark" ? "light" : "dark",
      );
      document.documentElement.classList.add(mode);
      localStorage.setItem("theme", mode);
    } else {
      document.documentElement.classList.remove("light", "dark");
      localStorage.removeItem("theme");
    }
    setTheme(mode);
  }

  return (
    <div className={twMerge("flex gap-2", className)} {...props}>
      {["dark", "light", ""].map((mode) => {
        return (
          <button
            data-theme={mode}
            disabled={theme === mode}
            className={twMerge(
              "px-4 py-2 rounded-md   cursor-pointer",
              theme === mode && "text-primary-foreground bg-primary",
              theme !== mode && "hover:bg-primary/5",
            )}
            key={mode}
            onClick={handleClick}
          >
            {mode || "system"}
          </button>
        );
      })}
    </div>
  );
}
