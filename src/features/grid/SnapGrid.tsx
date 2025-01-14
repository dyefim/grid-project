import { createSnapModifier } from "@dnd-kit/modifiers";

import { GRID_SIZE } from "./constants";
import { Grid } from "./components/Grid";
import useGridItems from "./hooks/useGridItems";
import { MovableItem } from "./components/MovableItem";
import { TooltipMenu } from "./components/TooltipMenu";

const snapToGrid = createSnapModifier(GRID_SIZE);

export const SnapGrid = () => {
  const { items, tooltipCoordinates, updateItemPosition, createItem, cancelTooltip } =
    useGridItems();

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
      <TooltipMenu
        tooltipCoordinates={tooltipCoordinates}
        onCreate={createItem}
        onCancel={cancelTooltip}
      />
      <Grid />
    </>
  );
};
