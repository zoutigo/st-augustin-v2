// lib/utils.ts
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combine des classes CSS conditionnelles avec la prise en charge de Tailwind Merge.
 * @param inputs Classes dynamiques ou fixes
 * @returns Une chaîne unique de classes CSS
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
