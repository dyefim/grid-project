import React from "react";

import styles from "./Grid.module.css";
import { GRID_SIZE } from "../../constants";

export interface Props {
  size: number;
}

export function Grid() {
  return (
    <div
      className={styles.Grid}
      style={
        {
          "--grid-size": `${GRID_SIZE}px`,
        } as React.CSSProperties
      }
    />
  );
}
