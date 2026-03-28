import type { IPosition } from "../structures/Position";

export const ALL_DIRECTIONS: IPosition[] = [
	{ x: 0, y: 1 }, // up
	{ x: 0, y: -1 }, // down
	{ x: 1, y: 0 }, // right
	{ x: -1, y: 0 }, // left
	{ x: 1, y: 1 }, // up-right
	{ x: 1, y: -1 }, // down-right
	{ x: -1, y: 1 }, // up-left
	{ x: -1, y: -1 }, // down-left
];

export const STRAIGHT_DIRECTIONS: IPosition[] = [
	{ x: 0, y: 1 }, // up
	{ x: 0, y: -1 }, // down
	{ x: 1, y: 0 }, // right
	{ x: -1, y: 0 }, // left
];

export const DIAGONAL_DIRECTIONS: IPosition[] = [
	{ x: 1, y: 1 }, // up-right
	{ x: 1, y: -1 }, // down-right
	{ x: -1, y: 1 }, // up-left
	{ x: -1, y: -1 }, // down-left
];

export const FORWARD_DIRECTIONS: IPosition[] = [
	{ x: 0, y: 1 }, // up
];

export const KNIGHT_DIRECTIONS: IPosition[] = [
	{ x: 1, y: 2 },
	{ x: 1, y: -2 },
	{ x: -1, y: 2 },
	{ x: -1, y: -2 },
	{ x: 2, y: 1 },
	{ x: 2, y: -1 },
	{ x: -2, y: 1 },
	{ x: -2, y: -1 },
];
