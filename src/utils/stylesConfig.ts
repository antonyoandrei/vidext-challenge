// Presets de iconos y valores para StylesPanel
import React, { JSX } from "react";
import type {
  TLDefaultColorStyle,
  TLDefaultFillStyle,
  TLDefaultDashStyle,
  TLDefaultSizeStyle,
  TLDefaultFontStyle,
} from "@tldraw/tldraw";
import { GeoKeys } from "@/types/types";
import {
  IconSquares,
  IconSquaresDiagonal,
  IconSquaresFilled,
  IconSquaresSelected,
  IconSquare,
  IconCircle,
  IconTriangle,
  IconSquareRotated,
  IconStar,
  IconPentagon,
  IconHexagon,
  IconOctagon,
  IconArrowBigLeft,
  IconArrowBigUp,
  IconArrowBigDown,
  IconArrowBigRight,
  IconCloud,
  IconSquareX,
  IconSquareCheck,
  IconHeart,
} from "@tabler/icons-react";

export const SHAPE_ICONS: Record<GeoKeys, JSX.Element> = {
  rectangle: React.createElement(IconSquare),
  oval: React.createElement(IconCircle),
  triangle: React.createElement(IconTriangle),
  diamond: React.createElement(IconSquareRotated),
  star: React.createElement(IconStar),
  pentagon: React.createElement(IconPentagon),
  hexagon: React.createElement(IconHexagon),
  octagon: React.createElement(IconOctagon),
  "arrow-left": React.createElement(IconArrowBigLeft),
  "arrow-up": React.createElement(IconArrowBigUp),
  "arrow-down": React.createElement(IconArrowBigDown),
  "arrow-right": React.createElement(IconArrowBigRight),
  cloud: React.createElement(IconCloud),
  "x-box": React.createElement(IconSquareX),
  "check-box": React.createElement(IconSquareCheck),
  heart: React.createElement(IconHeart),
};

export const SHAPES_PRESETS = Object.keys(SHAPE_ICONS) as GeoKeys[];

export const COLOR_PRESETS: TLDefaultColorStyle[] = [
  "black",
  "blue",
  "green",
  "grey",
  "light-blue",
  "light-green",
  "light-red",
  "light-violet",
  "orange",
  "red",
  "violet",
  "white",
  "yellow",
];

export const FILL_TYPES: {
  value: TLDefaultFillStyle;
  icon: React.ElementType;
}[] = [
  { value: "none", icon: IconSquares },
  { value: "semi", icon: IconSquaresDiagonal },
  { value: "solid", icon: IconSquaresFilled },
  { value: "pattern", icon: IconSquaresSelected },
];

export const DASH_OPTIONS: TLDefaultDashStyle[] = [
  "draw",
  "solid",
  "dashed",
  "dotted",
];

export const SIZE_OPTIONS: TLDefaultSizeStyle[] = ["s", "m", "l", "xl"];
export const FONT_OPTIONS: TLDefaultFontStyle[] = [
  "sans",
  "serif",
  "draw",
  "mono",
];
