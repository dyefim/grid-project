import styles from "./TooltipMenu.module.css";

import { Coordinates } from "../../hooks/useGridItems";
import { GRID_SIZE } from "../../constants";

interface Props {
  tooltipCoordinates: Coordinates | null;
  onCreate: () => void;
  onCancel: () => void;
}

export const TooltipMenu = ({
  tooltipCoordinates,
  onCreate,
  onCancel,
}: Props) => {
  if (!tooltipCoordinates) return null;

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const style = {
    position: "absolute",
    top: tooltipCoordinates.y,
    left: tooltipCoordinates.x,
    "--grid-size": `${GRID_SIZE}px`,
  } as React.CSSProperties;

  return (
    <div className={styles.tooltip} style={style} onClick={handleClick}>
      <p>Create an item here?</p>
      <button onClick={onCreate}>Create</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};
