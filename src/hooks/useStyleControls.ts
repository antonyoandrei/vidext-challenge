// Hook que agrupa lectura de estilos, setters y estado de forma seleccionada
import { useState, useEffect } from "react";
import {
  Editor,
  DefaultColorStyle,
  DefaultFillStyle,
  DefaultDashStyle,
  DefaultSizeStyle,
  DefaultFontStyle,
  TLDefaultColorStyle,
  TLDefaultFillStyle,
  TLDefaultDashStyle,
  TLDefaultSizeStyle,
  TLDefaultFontStyle,
  TLGeoShape,
  GeoShapeGeoStyle,
} from "@tldraw/tldraw";

export function useStyleControls(editor: Editor) {
  const tool = editor.getCurrentToolId();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [lastShape, setLastShape] = useState("rectangle");
  const [open, setOpen] = useState(false);

  // Sincroniza herramienta y tipo de selección
  useEffect(() => {
    const selected = editor.getSelectedShapes();
    if (selected.length === 1) {
      setSelectedType(selected[0].type);
    } else {
      setSelectedType(null);
    }
  }, [editor, editor.getSelectedShapeIds().join(",")]);

  // Lectura de cada estilo (next + selected)
  const color = editor.getStyleForNextShape(DefaultColorStyle) ?? "black";
  const fill = editor.getStyleForNextShape(DefaultFillStyle) ?? "solid";
  const dash = editor.getStyleForNextShape(DefaultDashStyle) ?? "draw";
  const size = editor.getStyleForNextShape(DefaultSizeStyle) ?? "m";
  const font = editor.getStyleForNextShape(DefaultFontStyle) ?? "sans";

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

  // Selección de forma geométrica
  const handleSelect = (shape: TLGeoShape["props"]["geo"]) => {
    editor.setCurrentTool("geo", { oneShot: false });
    editor.setStyleForNextShapes(GeoShapeGeoStyle, shape);
    editor.setCurrentTool("geo", { oneShot: false });

    if (editor.getSelectedShapeIds().length > 0) {
      editor.setCurrentTool("select", { oneShot: false });
      editor.setStyleForSelectedShapes(GeoShapeGeoStyle, shape);
    } else {
      editor.setStyleForNextShapes(GeoShapeGeoStyle, shape);
    }
    setLastShape(shape);
    setOpen(false);
  };

  // Opacidad compartida (0–100)
  const opacity = () => {
    const sharedOpacity = editor.getSharedOpacity();
    return sharedOpacity.type === "shared"
      ? Math.round(sharedOpacity.value * 100)
      : opacity;
  };

  return {
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
  };
}
