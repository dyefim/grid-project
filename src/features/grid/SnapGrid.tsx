import { createSnapModifier } from "@dnd-kit/modifiers";

import { GRID_SIZE } from "./constants";
import { Grid } from "./components/Grid";
import useGridItems from "./hooks/useGridItems";
import { MovableItem } from "./components/MovableItem";

const snapToGrid = createSnapModifier(GRID_SIZE);

export const SnapGrid = () => {
  const { items, updateItemPosition } = useGridItems();

  return (
    <>
      {items.map(({ id, coordinates }) => (
        <MovableItem
          key={id}
          id={id}
          modifiers={[snapToGrid]}
          initialCoordinates={coordinates}
          updateItemPosition={updateItemPosition}
        />
      ))}
      <Grid size={GRID_SIZE} />
    </>
  );
};
