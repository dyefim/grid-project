import { GRID_SIZE } from "../constants";

export const floorToGrid = (num = 0) => Math.floor(num / GRID_SIZE) * GRID_SIZE;
