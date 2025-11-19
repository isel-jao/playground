import React, { lazy, type ComponentType, type SVGProps } from "react";

export type IconComponent = React.LazyExoticComponent<
  ComponentType<SVGProps<SVGSVGElement>>
>;

const data = {
  bomb: lazy(() => import("@/assets/icons/bomb.svg?react")),
  cog: lazy(() => import("@/assets/icons/cog.svg?react")),
} as const;

export type IconName = keyof typeof data;

export const icons = new Map(Object.entries(data));
