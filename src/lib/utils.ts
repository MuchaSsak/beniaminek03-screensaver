import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import type { ColorToMix } from "@/lib/constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function colorMix(
  colorsOriginal: ColorToMix[],
  colorsTarget: ColorToMix[],
  progress: number
) {
  const colorsResult: ColorToMix[] = [];

  // Mix colors
  colorsOriginal.map((colorOriginal, i) => {
    colorsResult.push({
      red: Math.round(
        (colorOriginal.red + colorsTarget[i].red * progress) / (progress + 1)
      ),
      green: Math.round(
        (colorOriginal.green + colorsTarget[i].green * progress) /
          (progress + 1)
      ),
      blue: Math.round(
        (colorOriginal.blue + colorsTarget[i].blue * progress) / (progress + 1)
      ),
    });
  });

  // Convert to rgb string
  const colorsString = colorsResult.map(
    (color) => `rgb(${color.red},${color.green},${color.blue})`
  );

  return colorsString;
}
