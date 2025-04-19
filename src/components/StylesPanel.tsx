// Panel de estilos del lienzo: gestiona colores, opacidad, formas, relleno, trazo, tamaño y fuente
"use client";

// ——— Dependencias ———
import React from "react";
import { DefaultColorThemePalette } from "@tldraw/tldraw";
import {
  IconLineDashed,
  IconLineDotted,
  IconTextSize,
  IconWriting,
  IconSquare,
} from "@tabler/icons-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { cn } from "@/lib/utils";

// ——— Presets y hook centralizado ———
import { useStyleControls } from "@/hooks/useStyleControls";
import { EditorProp, GeoKeys } from "@/types/types";
import {
  COLOR_PRESETS,
  DASH_OPTIONS,
  FILL_TYPES,
  FONT_OPTIONS,
  SHAPES_PRESETS,
  SHAPE_ICONS,
  SIZE_OPTIONS,
} from "@/utils/stylesConfig";

export function StylesPanel({ editor }: EditorProp) {
  // Hook centralizado para lectura y ajuste de estilos
  const {
    tool,
    selectedType,
    lastShape,
    color,
    fill,
    dash,
    size,
    font,
    opacity,
    setColorStyle,
    setFillStyle,
    setDashStyle,
    setSizeStyle,
    setFontStyle,
    handleSelect,
    open,
    setOpen,
  } = useStyleControls(editor);

  // Condiciones de render según herramienta o selección
  const showBasic = ["select", "hand", "draw", "eraser", "geo"].includes(tool);
  const showText = tool === "text" || selectedType === "text";
  const showShape = tool === "geo" || selectedType === "geo";

  // Formatea la clave de la forma geométrica para mostrarla en el botón
  const formatLabel = (shape: string) => {
    return shape
      .replace(/-/g, " ")
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (s) => s.toUpperCase());
  };

  return (
    <div className="space-y-6 p-2">
      {/* — Colores — */}
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
                    "w-6 h-6 rounded-full border transition-all duration-150 ease-in-out",
                    color === colorKey
                      ? "ring-2 scale-90 ring-offset-1 ring-accent"
                      : ""
                  )}
                  style={{ backgroundColor: hex }}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* — Opacidad — */}
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
            className="w-full appearance-none h-2 rounded bg-primary-foreground [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent"
          />
          <span className="text-xs w-10 text-right">{Number(opacity())}%</span>
        </div>
      </div>

      {/* — Forma — */}
      {showShape && (
        <div className="space-y-1">
          <Label>Shape</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <button className="w-full px-3 py-2 flex items-center justify-between border rounded bg-white">
                <span>{formatLabel(lastShape)}</span>
                {SHAPE_ICONS[lastShape as GeoKeys] ?? <IconSquare />}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-2 space-y-2">
              <div className="grid grid-cols-4 gap-2 justify-items-center bg-white">
                {SHAPES_PRESETS.map((shape) => (
                  <button
                    key={shape}
                    onClick={() => handleSelect(shape)}
                    className="border p-2 rounded hover:bg-primary flex items-center justify-center"
                  >
                    {React.cloneElement(SHAPE_ICONS[shape], {
                      className: "w-5 h-5",
                    })}
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      )}

      {/* — Relleno — */}
      {showShape && (
        <div className="space-y-1">
          <Label>Fill</Label>
          <div className="flex gap-2">
            {FILL_TYPES.map(({ value, icon: Icon }) => (
              <button
                key={value}
                onClick={() => setFillStyle(value)}
                className={cn(
                  "p-2 border rounded transition-all duration-150 ease-in-out",
                  fill === value
                    ? "bg-accent text-accent-foreground"
                    : "bg-white text-accent"
                )}
              >
                <Icon className="w-5 h-5" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* — Trazo — */}
      {showBasic && selectedType !== "text" && (
        <div className="space-y-1">
          <Label>Dash</Label>
          <div className="flex gap-2 text-accent">
            {DASH_OPTIONS.map((style) => {
              const Icon =
                style === "dashed"
                  ? IconLineDashed
                  : style === "dotted"
                  ? IconLineDotted
                  : style === "draw"
                  ? IconWriting
                  : () => (
                      <div
                        className={`w-5 h-[2px] bg-accent transition-all duration-150 ease-in-out ${
                          dash === style ? "bg-primary" : ""
                        } rounded-full`}
                      />
                    );

              return (
                <button
                  key={style}
                  onClick={() => setDashStyle(style)}
                  className={cn(
                    "p-2 border rounded transition-all duration-150 ease-in-out",
                    dash === style
                      ? "bg-accent text-accent-foreground"
                      : "bg-white text-accent"
                  )}
                >
                  <Icon className="w-5 h-5" />
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* — Tamaño / Ancho — */}
      {(showBasic || showText) && (
        <div className="space-y-1">
          <Label>{showText ? "Size" : "Width"}</Label>
          <div className="flex items-center gap-3">
            {SIZE_OPTIONS.map((s) => {
              const sizeMap = { s: 8, m: 14, l: 20, xl: 26 };
              const iconSizes = { s: 14, m: 18, l: 22, xl: 26 };
              const isSelected = size === s;

              const baseClasses = showText
                ? "border rounded bg-white px-2 py-1 transition-all duration-150 ease-in-out"
                : "rounded-full border transition-all duration-150 ease-in-out";
              const highlightClasses =
                !showText && isSelected
                  ? "scale-90 ring-2 ring-accent ring-offset-1 shadow-lg"
                  : "";
              const unselectedClasses = !isSelected
                ? "border-transparent opacity-60"
                : "";
              return (
                <button
                  key={s}
                  onClick={() => setSizeStyle(s)}
                  className={cn(
                    baseClasses,
                    highlightClasses,
                    unselectedClasses
                  )}
                >
                  {showText ? (
                    <IconTextSize
                      style={{ width: iconSizes[s], height: iconSizes[s] }}
                    />
                  ) : (
                    <div
                      className="bg-accent rounded-full"
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

      {/* — Fuente — */}
      {showText && (
        <div className="space-y-1">
          <Label>Font</Label>
          <div className="flex gap-2 items-center">
            {FONT_OPTIONS.map((f) => (
              <button
                key={f}
                onClick={() => setFontStyle(f)}
                className={cn(
                  "text-sm px-2 py-1 border rounded  transition-all duration-150 ease-in-out",
                  font === f ? "bg-accent text-primary" : "bg-white text-accent"
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
