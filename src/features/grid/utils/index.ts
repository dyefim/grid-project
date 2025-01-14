import { gridSize } from "../constants";

export const round = (num?: number) =>
  num ? Math.round(num / gridSize) * gridSize : undefined;
