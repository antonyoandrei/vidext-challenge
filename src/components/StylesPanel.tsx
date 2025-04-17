"use client";

import {
  Editor,
  DefaultColorStyle,
  DefaultFillStyle,
  DefaultDashStyle,
  DefaultSizeStyle,
  DefaultFontStyle,
  DefaultColorThemePalette,
} from "@tldraw/tldraw";
import type {
  TLDefaultColorStyle,
  TLDefaultFillStyle,
  TLDefaultDashStyle,
  TLDefaultSizeStyle,
  TLDefaultFontStyle,
} from "@tldraw/tldraw";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  IconLineDashed,
  IconLineDotted,
  IconTextSize,
  IconSquares,
  IconSquaresDiagonal,
  IconSquaresFilled,
  IconSquaresSelected,
  IconChevronDown,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";

const COLOR_PRESETS: TLDefaultColorStyle[] = [
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

const FILL_TYPES: { value: TLDefaultFillStyle; icon: any }[] = [
  { value: "none", icon: IconSquares },
  { value: "semi", icon: IconSquaresDiagonal },
  { value: "solid", icon: IconSquaresFilled },
  { value: "pattern", icon: IconSquaresSelected },
];

const DASH_OPTIONS: TLDefaultDashStyle[] = [
  "draw",
  "solid",
  "dashed",
  "dotted",
];
const SIZE_OPTIONS: TLDefaultSizeStyle[] = ["s", "m", "l", "xl"];
const FONT_OPTIONS: TLDefaultFontStyle[] = ["sans", "serif", "draw", "mono"];

export function StylesPanel({ editor }: { editor: Editor }) {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const tool = editor.getCurrentToolId();

  const color = editor.getStyleForNextShape(DefaultColorStyle) ?? "black";
  const fill = editor.getStyleForNextShape(DefaultFillStyle) ?? "solid";
  const dash = editor.getStyleForNextShape(DefaultDashStyle) ?? "solid";
  const size = editor.getStyleForNextShape(DefaultSizeStyle) ?? "m";
  const font = editor.getStyleForNextShape(DefaultFontStyle) ?? "sans";

  useEffect(() => {
    const selected = editor.getSelectedShapes();
    if (selected.length === 1) {
      setSelectedType(selected[0].type);
    } else {
      setSelectedType(null);
    }
  }, [editor.getSelectedShapeIds().join(",")]);

  const setColorStyle = (value: TLDefaultColorStyle) => {
    editor.setStyleForNextShapes(DefaultColorStyle, value);
    if (editor.getSelectedShapeIds().length > 0) {
      editor.setStyleForSelectedShapes(DefaultColorStyle, value);
    }
  };

  const setFillStyle = (value: TLDefaultFillStyle) => {
    editor.setStyleForNextShapes(DefaultFillStyle, value);
    if (editor.getSelectedShapeIds().length > 0) {
      editor.setStyleForSelectedShapes(DefaultFillStyle, value);
    }
  };

  const setDashStyle = (value: TLDefaultDashStyle) => {
    editor.setStyleForNextShapes(DefaultDashStyle, value);
    if (editor.getSelectedShapeIds().length > 0) {
      editor.setStyleForSelectedShapes(DefaultDashStyle, value);
    }
  };

  const setSizeStyle = (value: TLDefaultSizeStyle) => {
    editor.setStyleForNextShapes(DefaultSizeStyle, value);
    if (editor.getSelectedShapeIds().length > 0) {
      editor.setStyleForSelectedShapes(DefaultSizeStyle, value);
    }
  };

  const setFontStyle = (value: TLDefaultFontStyle) => {
    editor.setStyleForNextShapes(DefaultFontStyle, value);
    if (editor.getSelectedShapeIds().length > 0) {
      editor.setStyleForSelectedShapes(DefaultFontStyle, value);
    }
  };

  const showBasic = [
    "select",
    "hand",
    "draw",
    "eraser",
    "pencil",
    "geo",
  ].includes(tool);
  const showText = tool === "text" || selectedType === "text";
  const showShape = tool === "geo" || selectedType === "geo";

  const opacity = () => {
    const sharedOpacity = editor.getSharedOpacity();
    return sharedOpacity.type === "shared"
      ? Math.round(sharedOpacity.value * 100)
      : opacity;
  };

  return (
    <div className="space-y-6 p-2">
      {(showBasic || showText) && (
        <div className="space-y-1">
          <div className="grid grid-cols-5 gap-2">
            {COLOR_PRESETS.map((colorKey) => {
              const hex =
                DefaultColorThemePalette.lightMode[colorKey].solid ??
                DefaultColorThemePalette.lightMode[colorKey].semi;

              return (
                <button
                  key={colorKey}
                  onClick={() => setColorStyle(colorKey)}
                  className={cn(
                    "w-6 h-6 rounded-full border",
                    color === colorKey ? "ring-2 ring-neutral-500" : ""
                  )}
                  style={{ backgroundColor: hex }}
                />
              );
            })}
          </div>
        </div>
      )}
      <div className="space-y-1">
        <Label>Opacity</Label>
        <div className="flex items-center gap-2">
          <Input
            type="range"
            min={0}
            max={100}
            step={1}
            value={Number(opacity())}
            onChange={(e) => {
              const value = parseInt(e.target.value, 10);
              const decimal = value / 100;
              editor.setOpacityForSelectedShapes(decimal);
              editor.setOpacityForNextShapes(decimal);
            }}
            className="w-full appearance-none h-2 rounded bg-gray-200 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black"
          />
          <span className="text-xs w-10 text-right">{Number(opacity())}%</span>
        </div>
      </div>

      {showShape && (
        <div className="space-y-1">
          <Label>Shape</Label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center px-2 py-1 border rounded">
                <IconChevronDown className="w-4 h-4 mr-1" />
                {selectedType ?? "Rectángulo"}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {[
                "rectangle",
                "ellipse",
                "triangle",
                "arrow",
                "line",
                "diamond",
                "polygon",
              ].map((shape) => (
                <DropdownMenuItem
                  key={shape}
                  onClick={() => {
                    editor.updateShapes(
                      editor.getSelectedShapeIds().map((id) => ({
                        id,
                        type: shape as any,
                        props: { ...editor.getShape(id)!.props },
                      }))
                    );
                    editor.setCurrentTool("shape", { shapeType: shape as any });
                  }}
                >
                  {shape.charAt(0).toUpperCase() + shape.slice(1)}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
      {showShape && (
        <div className="space-y-1">
          <Label>Fill</Label>
          <div className="flex gap-2">
            {FILL_TYPES.map(({ value, icon: Icon }) => (
              <button
                key={value}
                onClick={() => setFillStyle(value)}
                className={cn(
                  "p-2 border rounded",
                  fill === value ? "bg-black text-white" : "bg-white text-black"
                )}
              >
                <Icon className="w-5 h-5" />
              </button>
            ))}
          </div>
        </div>
      )}
      {showBasic && selectedType !== "text" && (
        <div className="space-y-1">
          <Label>Dash</Label>
          <div className="flex gap-2">
            {DASH_OPTIONS.map((style) => {
              const Icon =
                style === "dashed"
                  ? IconLineDashed
                  : style === "dotted"
                  ? IconLineDotted
                  : () => <div className="w-6 h-[2px] bg-black rounded-full" />;

              return (
                <button
                  key={style}
                  onClick={() => setDashStyle(style)}
                  className={cn(
                    "p-3 border rounded",
                    dash === style ? "border-neutral-500" : "border-transparent"
                  )}
                >
                  <Icon className="w-6 h-6" />
                </button>
              );
            })}
          </div>
        </div>
      )}
      {(showBasic || showText) && (
        <div className="space-y-1">
          <Label>{showText ? "Size" : "Width"}</Label>
          <div className="flex items-center gap-3">
            {SIZE_OPTIONS.map((s, i) => {
              const sizeMap = { s: 8, m: 14, l: 20, xl: 26 };
              const iconSizes = { s: 12, m: 16, l: 22, xl: 28 };
              return (
                <button
                  key={s}
                  onClick={() => setSizeStyle(s)}
                  className={cn(
                    "rounded-full border",
                    size === s ? "border-neutral-500" : "border-transparent"
                  )}
                >
                  {showText ? (
                    <IconTextSize
                      style={{ width: iconSizes[s], height: iconSizes[s] }}
                    />
                  ) : (
                    <div
                      className="bg-black rounded-full"
                      style={{
                        width: sizeMap[s],
                        height: sizeMap[s],
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
      {showText && (
        <div className="space-y-1">
          <Label>Font</Label>
          <div className="flex gap-2 items-center">
            {FONT_OPTIONS.map((f) => (
              <button
                key={f}
                onClick={() => setFontStyle(f)}
                className={cn(
                  "text-sm px-2 py-1 border rounded",
                  font === f ? "bg-black text-white" : "bg-white text-black"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
