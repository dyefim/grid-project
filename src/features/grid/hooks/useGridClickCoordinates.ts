import { useCallback, useEffect, useState } from "react";
import { gridSize } from "../constants";

export interface Coordinates {
  x: number;
  y: number;
}

export interface Item {
  id: number;
  coordinates: Coordinates;
}

const useGridItems = () => {
  const [items, setItems] = useState<Item[]>([]);

  const updateItemPosition = useCallback((item: Item) => {
    setItems((items) => [...items.filter((i) => i.id !== item.id), item]);
  }, []);

  const handleBodyClick = useCallback((event: MouseEvent) => {
    const { clientX, clientY } = event;

    // Calculate grid coordinates
    const left = Math.floor(clientX / gridSize) * gridSize;
    const top = Math.floor(clientY / gridSize) * gridSize;

    setItems((items) => [
      ...items,
      { id: Date.now(), coordinates: { x: left, y: top } },
    ]);
  }, []);

  useEffect(() => {
    document.body.addEventListener("click", handleBodyClick);

    return () => {
      document.body.removeEventListener("click", handleBodyClick);
    };
  }, [handleBodyClick]);

  return { items, updateItemPosition };
};

export default useGridItems;
