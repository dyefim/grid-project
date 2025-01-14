import { DndContext, Modifiers, useDraggable } from "@dnd-kit/core";
import { useState } from "react";
import { Coordinates, Item } from "../hooks/useGridItems";
import { Draggable } from "./Draggable/Draggable";
import { floorToGrid } from "../utils";
import { GRID_SIZE } from "../constants";

interface DraggableItemProps {
  id: number;
  top: number;
  left: number;
}

const DraggableItem = ({ id, top, left }: DraggableItemProps) => {
  const { attributes, isDragging, listeners, setNodeRef, transform } =
    useDraggable({
      id,
    });

  const style: React.CSSProperties = {
    position: "absolute",
    top: floorToGrid(top),
    left: floorToGrid(left),
    ...(transform && {
      transform: `translate(${transform.x}px, ${transform.y}px)`,
    }),
    transition: isDragging ? "none" : "all 0.2s",
    width: GRID_SIZE,
    height: GRID_SIZE,
  };

  return (
    <Draggable
      children="Eddie"
      ref={setNodeRef}
      dragging={isDragging}
      listeners={listeners}
      style={style}
      {...attributes}
    />
  );
};

interface Props {
  id: number;
  modifiers: Modifiers;
  initialCoordinates: Coordinates;
  updateItemPosition: (item: Item) => void;
}

export const MovableItem = ({
  id,
  modifiers,
  initialCoordinates,
  updateItemPosition,
}: Props) => {
  const [{ x: left, y: top }, setCoordinates] =
    useState<Coordinates>(initialCoordinates);

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
      <DraggableItem id={id} top={top} left={left} />
    </DndContext>
  );
};
