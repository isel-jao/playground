import DeviceIcon from "./icons/device.svg?react";
import MoonIcon from "./icons/moon.svg?react";
import SunIcon from "./icons/sun.svg?react";
import CheckIcon from "./icons/check.svg?react";
import { useState } from "react";
import { cn } from "@/lib/utils";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ToggleThemeButtonProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "children"
> {}

const modes: Record<string, { label: string; icon: React.ReactNode }> = {
  dark: {
    label: "dark",
    icon: <MoonIcon />,
  },
  light: {
    label: "light",
    icon: <SunIcon />,
  },
  "": {
    label: "device",
    icon: <DeviceIcon />,
  },
};

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
    <div
      className={cn("flex gap-2 [&_svg]:size-5 text-sm", className)}
      {...props}
    >
      {Object.entries(modes).map(([mode, { label, icon }]) => {
        return (
          <button
            data-theme={mode}
            disabled={theme === mode}
            className={cn(
              "flex items-center gap-1 relative ",
              "px-2 py-1 rounded cursor-pointer ",
              "transition-colors duration-500",
              {
                "text-primary-foreground bg-primary": theme === mode,
                "hover:bg-foreground/5": theme !== mode,
              },
            )}
            key={mode}
            onClick={handleClick}
          >
            {theme === mode ? <CheckIcon /> : icon}
            <span className="capitalize label">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
