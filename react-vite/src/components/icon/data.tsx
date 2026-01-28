import React, { lazy, type ComponentType, type SVGProps } from "react";

export type IconComponent = React.LazyExoticComponent<
  ComponentType<SVGProps<SVGSVGElement>>
>;

const data = {
  sun: lazy(() => import("@/assets/icons/sun.svg?react")),
  moon: lazy(() => import("@/assets/icons/moon.svg?react")),
  device: lazy(() => import("@/assets/icons/device.svg?react")),
  check: lazy(() => import("@/assets/icons/check.svg?react")),
};

export type IconName = keyof typeof data;

export const icons = new Map(Object.entries(data));
