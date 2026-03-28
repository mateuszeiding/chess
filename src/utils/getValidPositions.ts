import { MAX_BOARD_SIZE } from "./constants";

export const getValidPositions = (positions: IPosition[]): IPosition[] => {
	return positions.filter(
		(pos) =>
			pos.x >= 0 &&
			pos.x <= MAX_BOARD_SIZE &&
			pos.y >= 0 &&
			pos.y <= MAX_BOARD_SIZE,
	);
};
