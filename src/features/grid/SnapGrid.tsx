import React, { useState } from "react";
import { DndContext, useDraggable, Modifiers } from "@dnd-kit/core";
import { createSnapModifier } from "@dnd-kit/modifiers";
import type { Coordinates } from "@dnd-kit/utilities";

import { gridSize } from "./constants";
import { Grid } from "./components/Grid";
import { Draggable } from "./components/Draggable/Draggable";
import useGridItems, { Item } from "./hooks/useGridClickCoordinates";

const snapToGrid = createSnapModifier(gridSize);

interface Props {
  id: number;
  handle?: boolean;
  modifiers?: Modifiers;
  buttonStyle?: React.CSSProperties;
  initialCoordinates: Coordinates;
  updateItemPosition: (item: Item) => void;
}

function MovableItem({
  id,
  modifiers,
  buttonStyle,
  initialCoordinates,
  updateItemPosition,
}: Props) {
  const [{ x, y }, setCoordinates] = useState<Coordinates>(initialCoordinates);

  return (
    <DndContext
      onDragEnd={({ delta }) => {
        setCoordinates(({ x, y }) => {
          const newX = x + delta.x;
          const newY = y + delta.y;

          updateItemPosition({ id, coordinates: { x: newX, y: newY } });

          return { x: newX, y: newY };
        });
      }}
      modifiers={modifiers}
    >
      <DraggableItem top={y} left={x} buttonStyle={buttonStyle} />
    </DndContext>
  );
}

interface DraggableItemProps {
  handle?: boolean;
  buttonStyle?: React.CSSProperties;
  top?: number;
  left?: number;
}

function DraggableItem({ top, left, buttonStyle }: DraggableItemProps) {
  const { attributes, isDragging, listeners, setNodeRef, transform } =
    useDraggable({
      id: `draggable-${top}-${left}`, // Ensure a unique id for each item
    });

  const round = (num = 0) => Math.round(num / gridSize) * gridSize;

  const style: React.CSSProperties = {
    position: "absolute", // Absolute position for precise placement
    top: round(top),
    left: round(left),
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    transition: isDragging ? "none" : "all 0.2s",
    ...buttonStyle,
  };

  return (
    <Draggable
      ref={setNodeRef}
      dragging={isDragging}
      listeners={listeners}
      style={style}
      {...attributes}
    />
  );
}

export const SnapGrid = () => {
  const buttonStyle = {
    width: gridSize,
    height: gridSize,
  };

  const { items, updateItemPosition } = useGridItems();

  return (
    <>
      {items.map(({ id, coordinates }) => (
        <MovableItem
          key={id}
          id={id}
          modifiers={[snapToGrid]}
          buttonStyle={buttonStyle}
          initialCoordinates={coordinates}
          updateItemPosition={updateItemPosition}
        />
      ))}
      <Grid size={gridSize} />
    </>
  );
};
