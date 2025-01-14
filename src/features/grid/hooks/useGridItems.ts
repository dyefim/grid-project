import { useCallback, useEffect, useState } from "react";
import { floorToGrid } from "../utils";

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
  const [tooltipCoordinates, setTooltipCoordinates] =
    useState<Coordinates | null>(null);

  const updateItemPosition = useCallback((item: Item) => {
    setItems((items) => [...items.filter((i) => i.id !== item.id), item]);
  }, []);

  const handleBodyClick = useCallback((event: MouseEvent) => {
    event.preventDefault();

    const { clientX, clientY } = event;

    setTooltipCoordinates({
      x: floorToGrid(clientX),
      y: floorToGrid(clientY),
    });
  }, []);

  const closeTooltip = useCallback(() => {
    setTooltipCoordinates(null);
  }, []);

  const createItem = useCallback(() => {
    if (tooltipCoordinates) {
      setItems((items) => [
        ...items,
        {
          id: Date.now(),
          coordinates: tooltipCoordinates,
        },
      ]);
    }

    closeTooltip();
  }, [closeTooltip, tooltipCoordinates]);

  useEffect(() => {
    document.body.addEventListener("contextmenu", handleBodyClick);

    return () => {
      document.body.removeEventListener("contextmenu", handleBodyClick);
    };
  }, [handleBodyClick]);

  return {
    items,
    tooltipCoordinates,
    updateItemPosition,
    createItem,
    cancelTooltip: closeTooltip,
  };
};

export default useGridItems;
