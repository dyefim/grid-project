import React, { forwardRef } from "react";
import classNames from "classnames";
import type { DraggableSyntheticListeners } from "@dnd-kit/core";
import type { Transform } from "@dnd-kit/utilities";

import styles from "./Draggable.module.css";
import { gridSize } from "../../constants";

interface Props {
  dragging?: boolean;
  listeners?: DraggableSyntheticListeners;
  style?: React.CSSProperties;
  buttonStyle?: React.CSSProperties;
  transform?: Transform | null;
  children?: React.ReactNode;
}

export const Draggable = forwardRef<HTMLButtonElement, Props>(
  function Draggable(
    { dragging, listeners, transform, style, buttonStyle, ...props },
    ref
  ) {
    return (
      <div
        className={classNames(styles.Draggable, dragging && styles.dragging)}
        style={
          {
            ...style,
            "--item-size": `${gridSize}px`,
            "--translate-x": `${transform?.x ?? 0}px`,
            "--translate-y": `${transform?.y ?? 0}px`,
          } as React.CSSProperties
        }
      >
        <button {...props} {...listeners} ref={ref} style={buttonStyle}>
          {props.children || `top: ${style?.top}px left: ${style?.left}px`}
        </button>
      </div>
    );
  }
);
